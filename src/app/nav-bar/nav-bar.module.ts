import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { FormsModule } from '@angular/forms';
import { FriendRequestComponent } from '../friend-request/friend-request.component';
import { NotificationComponent } from '../notification/notification.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { FriendRequestModule } from '../friend-request/friend-request.module';
import { NotificationModule } from '../notification/notification.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    FriendRequestModule,
    NotificationModule,
    RouterModule,
  ],
  exports: [NavBarComponent],
})
export class NavBarModule {}
