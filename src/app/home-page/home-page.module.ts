import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms';
import { SideBarModule } from '../side-bar/side-bar.module';
import { CreatePostModule } from '../create-post/create-post.module';
import { PostsContainerModule } from '../posts-container/posts-container.module';
import { FriendsContainerModule } from '../friends-container/friends-container.module';
import { SharePostModule } from '../share-post/share-post.module';
import { WhatOnMindModule } from '../what-on-mind/what-on-mind.module';
import { AccountPhotosModule } from '../account-photos/account-photos.module';

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SideBarModule,
    FriendsContainerModule,
    CreatePostModule,
    PostsContainerModule,
    SharePostModule,
    WhatOnMindModule,
    AccountPhotosModule,
  ],
})
export class HomePageModule {}
