import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendRequestComponent } from './friend-request.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [FriendRequestComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FriendRequestComponent],
})
export class FriendRequestModule {}
