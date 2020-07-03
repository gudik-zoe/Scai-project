import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SideBarModule } from '../side-bar/side-bar.module';

const routes: Routes = [{ path: '', component: AccountSettingsComponent }];

@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SideBarModule,
  ],
})
export class AccountSettingsModule {}
