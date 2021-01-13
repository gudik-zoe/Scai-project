import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsContainerComponent } from './friends-container.component';
import { FormsModule } from '@angular/forms';
import { DeletePostModule } from '../delete-post/delete-post.module';
import { MyFriendsComponent } from '../my-friends/my-friends.component';

@NgModule({
  declarations: [FriendsContainerComponent, MyFriendsComponent],
  imports: [CommonModule, FormsModule, DeletePostModule],
  exports: [FriendsContainerComponent],
})
export class FriendsContainerModule {}
