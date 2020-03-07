import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DescriptionRequestModel } from 'src/data-model/DescriptionRequest.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DataProviderService } from '../data-provider.service';
import { DescriptionResponseModel } from 'src/data-model/DescriptionResponse.model';
import { DialogData } from '../../data-model/dailogData.model';
import { DialogService } from '../services/dialog.service';
import { LocalDataStorageService } from '../services/localDataStorage.service';
import { LoginResponseModel } from 'src/data-model/LoginResponseModel';

@Component({
  selector: 'app-selection-component',
  templateUrl: './selection-component.component.html',
  styleUrls: ['./selection-component.component.css']
})
export class SelectionComponentComponent implements OnInit {

  userName: string;
  selectionForm: FormGroup;
  selectionReqData: DescriptionRequestModel;
  descRes: DescriptionResponseModel;
  constructor(private router: Router,
    private fb: FormBuilder,
     private dataProviderService: DataProviderService,
     private dialogService: DialogService,
     private localDataStore: LocalDataStorageService
    ) { }

  ngOnInit() {
    this.userName = this.localDataStore.getLocalDataStorage('userName');
    this.selectionForm = this.fb.group({
      frontend: [null, Validators.required],
      backend: [null, Validators.required],
      database: [null, Validators.required]
    });
  }
  submitData(): void {
   this.selectionReqData.frontEnd = this.selectionForm.controls.frontend.value;
   this.selectionReqData.backEnd = this.selectionForm.controls.backEnd.value;
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


