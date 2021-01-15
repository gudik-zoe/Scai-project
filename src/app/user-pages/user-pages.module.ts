import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPagesComponent } from './user-pages.component';
import { PostsContainerModule } from '../posts-container/posts-container.module';
import { RouterModule, Routes } from '@angular/router';
import { WhatOnMindModule } from '../what-on-mind/what-on-mind.module';
import { CreatePostModule } from '../create-post/create-post.module';
import { PostsService } from '../services/posts.service';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { FormsModule } from '@angular/forms';
import { AccountPhotosModule } from '../account-photos/account-photos.module';

const routes: Routes = [{ path: ':id', component: UserPagesComponent }];

@NgModule({
  declarations: [UserPagesComponent, EditPageComponent],
  imports: [
    CommonModule,
    PostsContainerModule,
    WhatOnMindModule,
    FormsModule,
    RouterModule.forChild(routes),
    AccountPhotosModule,
    CreatePostModule,
  ],
  exports: [UserPagesComponent],
})
export class UserPagesModule {}
