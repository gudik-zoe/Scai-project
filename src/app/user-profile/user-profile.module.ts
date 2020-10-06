import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';


const routes: Routes = [{ path: ':id', component: UserProfileComponent }];


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserProfileModule { }
