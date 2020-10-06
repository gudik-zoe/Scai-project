import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsContainerComponent } from './friends-container.component';
import { FormsModule } from '@angular/forms';
import { MyFriendsModule } from '../my-friends/my-friends.module';

@NgModule({
  declarations: [FriendsContainerComponent],
  imports: [CommonModule, FormsModule, MyFriendsModule],
  exports: [FriendsContainerComponent],
})
export class FriendsContainerModule {}
