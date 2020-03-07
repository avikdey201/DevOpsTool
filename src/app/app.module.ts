import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectionComponentComponent } from './selection-component/selection-component.component';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DcodeDialogComponent } from './reusable-component/dcode-dialog/dcode-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from './services/dialog.service';
import { LocalDataStorageService } from './services/localDataStorage.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    SelectionComponentComponent,
    DcodeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [DialogService, LocalDataStorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
