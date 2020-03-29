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
  selectionForm: FormGroup;
  selectionReqData: DescriptionRequestModel = new DescriptionRequestModel();
  descRes: DescriptionResponseModel;
  disableSubmitBtn: boolean;
  repoUserName: string;
  repoPassword: string;
  repoUrl: string;
  constructor(private router: Router,
    private fb: FormBuilder,
     private dataProviderService: DataProviderService,
     private dialogService: DialogService,
     private localDataStore: LocalDataStorageService,
     private loginDataStore: LoginDataStorageService
    ) { }

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
            console.log("Repo details",this.localDataStore.getLocalDataStorage('repository-url'));
            this.repoUserName = this.localDataStore.getLocalDataStorage('repository-userName');
            this.repoPassword = this.localDataStore.getLocalDataStorage('repository-password');
            this.repoUrl = this.localDataStore.getLocalDataStorage('repository-url');
           }
          if(this.localDataStore.getLocalDataStorage('submit')){
            this.disableSubmitBtn = true;
          }
        
        //});
       
      }
    
    
  
  }

  submitData(): void {
   this.selectionReqData.frontEnd = this.selectionForm.controls.frontend.value;
   this.selectionReqData.backEnd = this.selectionForm.controls.backend.value;
   this.selectionReqData.db = this.selectionForm.controls.database.value;
   this.dataProviderService.getDescriptionStatus(this.selectionReqData).subscribe(
    (data: DescriptionResponseModel) => {
       this.descRes = data;
       console.log('Token received from backend',this.descRes.status);
       if (!data.status &&
        data.status === 'Success') {
        const dialogData: DialogData = {dialogType: 'Error',
         dialogTitle: 'Success', dialogContent: 'Proper Data Submitted',
         dialogButtonTexts: ['Close']
        };
        this.dialogService.openDialog(dialogData);
   }
    });

    }

    logOut() {
      this.localDataStore.clear();
      this.router.navigateByUrl('/');
    }
  }


