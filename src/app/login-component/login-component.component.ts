import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder
    // private dataProviderService: DataProviderService,
    // private codeEvalutionService: CodeEvalutionService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(): void {
    //const loginData = { 'userName': this.loginForm.controls.userName.value, 'password': this.loginForm.controls.password.value }
    
        this.router.navigate(['/description']);
     

  }

}
