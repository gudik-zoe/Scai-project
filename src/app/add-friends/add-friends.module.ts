import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes , RouterModule} from '@angular/router';
import { AddFriendsComponent } from './add-friends.component';

const routes:Routes = [
  {path:'' , component:AddFriendsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AddFriendsModule { }
