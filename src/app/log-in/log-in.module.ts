import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
const routes: Routes = [{ path: '', component: LogInComponent }];

@NgModule({
  declarations: [
    LogInComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class LogInModule {}
