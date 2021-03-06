import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { FormsModule } from '@angular/forms';
import { FriendRequestModule } from '../friend-request/friend-request.module';
import { NotificationModule } from '../notification/notification.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    FriendRequestModule,
    NotificationModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [NavBarComponent],
})
export class NavBarModule {}
