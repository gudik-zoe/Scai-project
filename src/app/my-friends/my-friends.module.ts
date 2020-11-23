import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFriendsComponent } from './my-friends.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MyFriendsComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [MyFriendsComponent],
})
export class MyFriendsModule {}
