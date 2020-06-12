import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes , RouterModule} from '@angular/router';
import { MyFriendsComponent } from './my-friends.component';


const routes: Routes = [
  {path:'' , component:MyFriendsComponent}
]

@NgModule({
  declarations: [MyFriendsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MyFriendsModule { }
