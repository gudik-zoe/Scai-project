import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SideBarModule } from '../side-bar/side-bar.module';
import { ChangeEmailPassComponent } from '../change-email-pass/change-email-pass.component';

const routes: Routes = [{ path: '', component: AccountSettingsComponent }];

@NgModule({
  declarations: [AccountSettingsComponent, ChangeEmailPassComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SideBarModule,
  ],
})
export class AccountSettingsModule {}
