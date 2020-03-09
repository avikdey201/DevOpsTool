import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../../data-model/LoginResponseModel';

@Injectable()
export class LoginDataStorageService {
    loginData= new LoginResponseModel();
    
    getLoginDataStorage(): any {
        return this.loginData;
    }

    putLoginDataStorage(loginRes : LoginResponseModel): void {
        this.loginData = loginRes;
    }
   
}