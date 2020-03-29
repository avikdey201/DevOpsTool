import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from '../../data-model/LoginRequestModel';
import { DataProviderService } from '../data-provider.service';
import { LoginResponseModel } from '../../data-model/LoginResponseModel';
import { LocalDataStorageService } from '../services/localDataStorage.service';
import { LoginDataStorageService } from '../services/loginDataStorage.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  loginForm: FormGroup;
  loginReqData: LoginRequestModel;
  isClicked: boolean;
  constructor(private router: Router,
    private fb: FormBuilder,
     private dataProviderService: DataProviderService,
     private localDataStore: LocalDataStorageService,
     private loginDataStore: LoginDataStorageService
    ) { }
    loginRes: LoginResponseModel = new LoginResponseModel();
  ngOnInit() {

    if (this.localDataStore.getLocalDataStorage('token')) {
      // this.dataProviderService.getLoginDataWithDetails(this.loginReqData).subscribe(
      //   (data: LoginResponseModel) => {
      //      this.loginRes = data;
      //      this.loginDataStore.putLoginDataStorage(this.loginRes);
           console.log('Token received from backend', this.loginRes.userId);
           this.router.navigate(['/select']);
        //});
      
    }
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(): void {
   this.loginReqData = new LoginRequestModel();
    this.loginReqData.userId = this.loginForm.controls.userName.value;
    this.loginReqData.password = this.loginForm.controls.password.value;
   this.dataProviderService.getLoginDataWithDetails(this.loginReqData).subscribe(
    //this.localDataStore.login(this.loginReqData).subscribe(
      (data: LoginResponseModel) => {
         this.loginRes = data;
         console.log('Token received from backend', this.loginRes.userId);
         this.localDataStore.putLocalDataStorage(this.loginRes, 'userDetails');
         this.localDataStore.putLocalDataStorage(this.loginRes.userId, 'token');
         this.localDataStore.putLocalDataStorage(this.loginRes.userName, 'userName');
         if(this.loginRes.frontend !== null){
         this.localDataStore.putLocalDataStorage(this.loginRes.frontend, 'frontend');
         }
         if(this.loginRes.service !== null){
         this.localDataStore.putLocalDataStorage(this.loginRes.service, 'backend');
         }
         if(this.loginRes.db !== null){
         this.localDataStore.putLocalDataStorage(this.loginRes.db, 'db');
         }
         if(this.loginRes.repository !== null){
          this.localDataStore.putLocalDataStorage(this.loginRes.repository.username, 'repository-userName');
          this.localDataStore.putLocalDataStorage(this.loginRes.repository.password, 'repository-password');
          this.localDataStore.putLocalDataStorage(this.loginRes.repository.frontEndUrl, 'repository-url');
         }
         this.localDataStore.putLocalDataStorage(this.loginRes.status, 'submit');
        this.router.navigate(['/select']);
        this.isClicked=true;
  });
}
}
