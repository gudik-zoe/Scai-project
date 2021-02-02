import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms';
import { SideBarModule } from '../side-bar/side-bar.module';
import { CreatePostModule } from '../create-post/create-post.module';
import { PostsContainerModule } from '../posts-container/posts-container.module';
import { FriendsContainerModule } from '../friends-container/friends-container.module';
import { WhatOnMindModule } from '../what-on-mind/what-on-mind.module';
import { AccountPhotosModule } from '../account-photos/account-photos.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    WhatOnMindModule,
    AccountPhotosModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class HomePageModule {}
