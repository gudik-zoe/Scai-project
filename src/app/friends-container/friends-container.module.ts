import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsContainerComponent } from './friends-container.component';
import { FormsModule } from '@angular/forms';
import { MyFriendsModule } from '../my-friends/my-friends.module';
import { DeletePostModule } from '../delete-post/delete-post.module';

@NgModule({
  declarations: [FriendsContainerComponent],
  imports: [CommonModule, FormsModule, MyFriendsModule, DeletePostModule],
  exports: [FriendsContainerComponent],
})
export class FriendsContainerModule {}
