import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPagesComponent } from './user-pages.component';
import { PostsContainerModule } from '../posts-container/posts-container.module';
import { RouterModule, Routes } from '@angular/router';
import { WhatOnMindModule } from '../what-on-mind/what-on-mind.module';

const routes: Routes = [{ path: ':id', component: UserPagesComponent }];

@NgModule({
  declarations: [UserPagesComponent],
  imports: [
    CommonModule,
    PostsContainerModule,
    WhatOnMindModule,
    RouterModule.forChild(routes),
  ],
  exports: [UserPagesComponent],
})
export class UserPagesModule {}
