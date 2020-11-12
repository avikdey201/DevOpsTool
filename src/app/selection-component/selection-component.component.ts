import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DescriptionRequestModel } from 'src/data-model/DescriptionRequest.model';
import { DataProviderService } from '../data-provider.service';
import { DescriptionResponseModel } from 'src/data-model/DescriptionResponse.model';
import { DialogData } from '../../data-model/dailogData.model';
import { DialogService } from '../services/dialog.service';
import { LocalDataStorageService } from '../services/localDataStorage.service';
import { LoginResponseModel } from 'src/data-model/LoginResponseModel';
import { LoginDataStorageService } from '../services/loginDataStorage.service';
import { LoginRequestModel } from 'src/data-model/LoginRequestModel';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 


@Component({
  selector: 'app-selection-component',
  templateUrl: './selection-component.component.html',
  styleUrls: ['./selection-component.component.css']
})
export class SelectionComponentComponent implements OnInit {
//@Input() loginData : LoginResponseModel
  loginData: LoginResponseModel = new LoginResponseModel() ;
  loginReqData: LoginRequestModel;
  userName: string;
  id: number;
  selectionForm: FormGroup;
  selectionReqData: DescriptionRequestModel = new DescriptionRequestModel();
  descRes: DescriptionResponseModel;
  submitRes: DescriptionResponseModel;
  disableSubmitBtn: boolean;
  repoUserName: string;
  repoPassword: string;
  repoFrontEndUrl: string;
  repoBackEndUrl: string;
  submitSubscription: Subscription;
  constructor(private router: Router,
    private fb: FormBuilder,
     private dataProviderService: DataProviderService,
     private dialogService: DialogService,
     private localDataStore: LocalDataStorageService,
     private loginDataStore: LoginDataStorageService,
     private ngxService: NgxUiLoaderService

    ) { }
    loginRes: LoginResponseModel = new LoginResponseModel();
  ngOnInit() {
    this.selectionForm = this.fb.group({
      frontend: [null, Validators.required],
      backend: [null, Validators.required],
      database: [null, Validators.required]
       });
    this.userName = this.localDataStore.getLocalDataStorage('userName');
    
    //this.loginData = this.loginDataStore.getLoginDataStorage();
    if (this.localDataStore.getLocalDataStorage('userName')) {
      // this.dataProviderService.getLoginDataWithDetails(this.loginReqData).subscribe(
      //   (data: LoginResponseModel) => {
      //      this.loginData = data;
           if(this.localDataStore.getLocalDataStorage('frontend') !== null){
            console.log("Selected User is:",this.loginData.userName);
            this.loginData.userName = this.localDataStore.getLocalDataStorage('userName');
            console.log("Repo details",this.localDataStore.getLocalDataStorage('repository-url'));
            this.repoUserName = this.localDataStore.getLocalDataStorage('repository-userName');
            this.repoPassword = this.localDataStore.getLocalDataStorage('repository-password');
            this.repoFrontEndUrl = this.localDataStore.getLocalDataStorage('frontEnd-url');
            this.repoBackEndUrl = this.localDataStore.getLocalDataStorage('serviceEnd-url');
           }
          //this.localDataStore.putLocalDataStorage(this.loginRes.status, 'submit');
        this.disableButton();
        
      //  });
       
      }
    
    
  
  }

  disableButton():void{
    if(this.localDataStore.getLocalDataStorage('submit') !== "null"){
      this.disableSubmitBtn = true;
    }
    if(this.localDataStore.getLocalDataStorage('frontend')){
      this.selectionForm.controls.frontend.setValue(this.localDataStore.getLocalDataStorage('frontend'));
      this.selectionForm.controls.frontend.disable();
      }
      if(this.localDataStore.getLocalDataStorage('backend')){
      this.selectionForm.controls.backend.setValue(this.localDataStore.getLocalDataStorage('backend'));
      this.selectionForm.controls.backend.disable();
      }
      if(this.localDataStore.getLocalDataStorage('db')){
      this.selectionForm.controls.database.setValue(this.localDataStore.getLocalDataStorage('db'));
      this.selectionForm.controls.database.disable();
      }
  }

  saveData(): void {
    
    this.selectionReqData.userId=this.localDataStore.getLocalDataStorage('userId'); 
    this.selectionReqData.userDetailId=this.localDataStore.getLocalDataStorage('userDetailId'); 
   this.selectionReqData.frontEndLanguage = this.selectionForm.controls.frontend.value;
   this.selectionReqData.backendLanguage = this.selectionForm.controls.backend.value;
   this.selectionReqData.database = this.selectionForm.controls.database.value;
   this.ngxService.start();
   this.dataProviderService.getDescriptionStatus(this.selectionReqData).subscribe(
    (data: DescriptionResponseModel) => {
       this.descRes = data;
       console.log('Service Returned', this.descRes.message);
       if (this.descRes.message === 'Data stored properly') {
        const dialogData: DialogData = {dialogType: 'Success',
         dialogTitle: 'Success', dialogContent: 'Proper Data Submitted',
         dialogButtonTexts: ['Close']
        };
        this.dialogService.openDialog(dialogData);
        this.refreshLocalDataStorage();
        this.repoFrontEndUrl = this.descRes.frontEndUrl;
        this.repoBackEndUrl = this.descRes.serviceUrl;
        this.ngxService.stop();
   }
    });

    
    }

    refreshLocalDataStorage():void{
      this.loginReqData = new LoginRequestModel();
    this.loginReqData.userId = this.localDataStore.getLocalDataStorage('userId'); 
    this.loginReqData.password = this.localDataStore.getLocalDataStorage('password'); 
    this.dataProviderService.getLoginDataWithDetails(this.loginReqData).subscribe(
      (data: LoginResponseModel) => {
        this.loginRes = data;
        console.log('Token received from backend', this.loginRes.userId);
        this.localDataStore.putLocalDataStorage(this.loginRes, 'userDetails');
        this.localDataStore.putLocalDataStorage(this.loginRes.userId, 'token');
        this.localDataStore.putLocalDataStorage(this.loginRes.userDetailId, 'userDetailId');
        this.localDataStore.putLocalDataStorage(this.loginRes.userId, 'userId');
        this.localDataStore.putLocalDataStorage(this.loginRes.userName, 'userName');
        this.localDataStore.putLocalDataStorage(this.loginReqData.password, 'password');
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
         this.localDataStore.putLocalDataStorage(this.loginRes.repository.frontEndUrl, 'frontEnd-url');
         this.localDataStore.putLocalDataStorage(this.loginRes.repository.serviceEndUrl, 'serviceEnd-url');
        }
        this.localDataStore.putLocalDataStorage(this.loginRes.status, 'submit');
        this.disableButton();
      });
    }
    submitData(): void {
      this.id=this.localDataStore.getLocalDataStorage('userDetailId');
      this.submitSubscription = this.dataProviderService.submitDetails(this.id).subscribe(
        (data: DescriptionResponseModel) => {
           this.submitRes = data;
           console.log('Submit Service returned',this.submitRes.message); 
           if (this.submitRes.message === 'Data submitted properly') {
            const dialogData: DialogData = {dialogType: 'Success',
             dialogTitle: 'Success', dialogContent: 'Data submitted properly',
             dialogButtonTexts: ['Close']
            };
            this.dialogService.openDialog(dialogData);
       } 
        }
      );

    }


    logOut() {
      this.localDataStore.clear();
      this.router.navigateByUrl('/');
    }
  }


