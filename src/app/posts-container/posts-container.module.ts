import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { PostsContainerComponent } from './posts-container.component';
import { DeletePostModule } from '../delete-post/delete-post.module';
import { EditPostModule } from '../edit-post/edit-post.module';
import { CreatePostModule } from '../create-post/create-post.module';
import { MaterialModule } from '../material/material.module';
import { SharePostModule } from '../share-post/share-post.module';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [PostsContainerComponent, PostComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    DeletePostModule,
    EditPostModule,
    CreatePostModule,
    SharePostModule,
    MaterialModule,
  ],
  exports: [PostsContainerComponent],
})
export class PostsContainerModule {}
