import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-component',
  templateUrl: './selection-component.component.html',
  styleUrls: ['./selection-component.component.css']
})
export class SelectionComponentComponent implements OnInit {

 
  selectionForm: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder
    // private dataProviderService: DataProviderService,
    // private codeEvalutionService: CodeEvalutionService
    ) { }

  ngOnInit() {
    this.selectionForm = this.fb.group({
      frontend: [null, Validators.required],
      backend: [null, Validators.required],
      database: [null, Validators.required]
    });
  }

}
