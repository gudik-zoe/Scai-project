import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFriendsComponent } from './my-friends.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyFriendsComponent],
  imports: [CommonModule, FormsModule],
  exports: [MyFriendsComponent],
})
export class MyFriendsModule {}
