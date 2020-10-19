import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms';
import { MyFriendsModule } from '../my-friends/my-friends.module';
import { SideBarModule } from '../side-bar/side-bar.module';
import { AlertModule } from '../alert/alert.module';
import { PostsContainerModule } from '../posts-container/posts-container.module';
import { PostModule } from '../post/post.module';
import { FriendsContainerModule } from '../friends-container/friends-container.module';
import { SharePostModule } from '../share-post/share-post.module';
import { EditPostModule } from '../edit-post/edit-post.module';

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SideBarModule,
    FriendsContainerModule,
    AlertModule,
    PostsContainerModule,
    SharePostModule,
    EditPostModule,
  ],
})
export class HomePageModule {}
