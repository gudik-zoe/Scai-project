import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { PostsContainerModule } from '../posts-container/posts-container.module';
import { LeavePostModule } from '../leave-post/leave-post.module';
import { WhatOnMindModule } from '../what-on-mind/what-on-mind.module';
import { FriendsContainerModule } from '../friends-container/friends-container.module';
import { SharePostModule } from '../share-post/share-post.module';
import { AccountPhotosModule } from '../account-photos/account-photos.module';
import { IntroComponent } from '../intro/intro.component';

const routes: Routes = [{ path: ':id', component: UserProfileComponent }];

@NgModule({
  declarations: [UserProfileComponent, IntroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PostsContainerModule,
    LeavePostModule,
    WhatOnMindModule,
    FriendsContainerModule,
    SharePostModule,
    AccountPhotosModule,
  ],
})
export class UserProfileModule {}
