import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { PostsContainerComponent } from './posts-container.component';
import { PostModule } from '../post/post.module';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { EditPostModule } from '../edit-post/edit-post.module';

@NgModule({
  declarations: [PostsContainerComponent],
  imports: [CommonModule, FormsModule, PostModule, EditPostModule],
  exports: [PostsContainerComponent],
})
export class PostsContainerModule {}
