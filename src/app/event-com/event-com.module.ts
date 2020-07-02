import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComComponent } from './event-com.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MyFriendsComponent } from '../my-friends/my-friends.component';
import { SideBarModule } from '../side-bar/side-bar.module';
import { MyFriendsModule } from '../my-friends/my-friends.module';

const routes: Routes = [{ path: '', component: EventComComponent }];

@NgModule({
  declarations: [EventComComponent],
  imports: [
    CommonModule,
    FormsModule,
    SideBarModule,
    MyFriendsModule,
    RouterModule.forChild(routes),
  ],
})
export class EventComModule {}
