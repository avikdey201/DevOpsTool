import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from '../../data-model/LoginRequestModel';
import { DataProviderService } from '../data-provider.service';
import { LoginResponseModel } from '../../data-model/LoginResponseModel';
import { LocalDataStorageService } from '../services/localDataStorage.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  loginForm: FormGroup;
  loginReqData: LoginRequestModel;
  constructor(private router: Router,
    private fb: FormBuilder,
     private dataProviderService: DataProviderService,
     private localDataStore: LocalDataStorageService
    ) { }
    loginRes: LoginResponseModel = new LoginResponseModel();
  ngOnInit() {

    if (this.localDataStore.getLocalDataStorage('userDetails')) {
      this.router.navigate(['/select']);
    }
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(): void {
   this.loginReqData = new LoginRequestModel();
    this.loginReqData.userName = this.loginForm.controls.userName.value;
    this.loginReqData.password = this.loginForm.controls.password.value;
    this.dataProviderService.getLoginData(this.loginReqData).subscribe(
      (data: LoginResponseModel) => {
         this.loginRes = data;
         console.log('Token received from backend', this.loginRes.token);
         this.localDataStore.putLocalDataStorage(this.loginRes, 'userDetails');
         this.localDataStore.putLocalDataStorage(this.loginRes.token, 'token');
         this.localDataStore.putLocalDataStorage(this.loginRes.userName, 'userName');
        this.router.navigate(['/select']);
  });
}
}
