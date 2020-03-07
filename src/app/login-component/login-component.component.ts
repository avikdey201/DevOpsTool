import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from '../../data-model/LoginRequestModel';
import { DataProviderService } from '../data-provider.service';
import { LoginResponseModel } from '../../data-model/LoginResponseModel';
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
    // private codeEvalutionService: CodeEvalutionService
    ) { }
    loginRes: LoginResponseModel = new LoginResponseModel();
  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(): void {
    //const loginData = { 'userName': this.loginForm.controls.userName.value, 'password': this.loginForm.controls.password.value }
    this.loginReqData = new LoginRequestModel();
    this.loginReqData.userName = this.loginForm.controls.userName.value;
    this.loginReqData.password = this.loginForm.controls.password.value;
    this.dataProviderService.getLoginData(this.loginReqData).subscribe(
      (data: LoginResponseModel) => {
         this.loginRes = data;
         console.log("Token received from backend",this.loginRes.token);    
      });
        
        this.router.navigate(['/description']);
     

  }

}
