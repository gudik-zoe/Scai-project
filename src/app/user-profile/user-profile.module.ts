import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { PostModule } from '../post/post.module';
import { PostsContainerModule } from '../posts-container/posts-container.module';
import { LeavePostModule } from '../leave-post/leave-post.module';
import { WhatOnMindModule } from '../what-on-mind/what-on-mind.module';
import { FriendsContainerModule } from '../friends-container/friends-container.module';
import { SharePostModule } from '../share-post/share-post.module';

const routes: Routes = [{ path: ':id', component: UserProfileComponent }];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PostModule,
    PostsContainerModule,
    LeavePostModule,
    WhatOnMindModule,
    FriendsContainerModule,
    SharePostModule,
  ],
})
export class UserProfileModule {}
