import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../../data-model/LoginRequestModel';
import { HttpClient } from '@angular/common/http';
import {  DataProviderService } from '../data-provider.service' ; 
import { LoginResponseModel } from '../../data-model/LoginResponseModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LocalDataStorageService {

    constructor(private http: HttpClient, private dataProviderService: DataProviderService,) { }

    loginReqData = LoginRequestModel;
    loginData = LoginResponseModel;
    private currentUserSubject: BehaviorSubject<LoginResponseModel>;

    getLocalDataStorage(key: string): any {
        return localStorage.getItem(key);
    }

    putLocalDataStorage(data: any, key: string): void {
        localStorage.setItem(key, data);
    }

   

    putLoginDataStorage(data: any, key: string){
        localStorage.setItem(key, data);
    }

    clear() {
        localStorage.clear();
    }


}