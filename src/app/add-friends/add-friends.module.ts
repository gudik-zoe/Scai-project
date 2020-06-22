import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddFriendsComponent } from './add-friends.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: AddFriendsComponent }];

@NgModule({
  declarations: [AddFriendsComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class AddFriendsModule {}
