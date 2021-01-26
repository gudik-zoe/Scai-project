import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { PostsContainerComponent } from './posts-container.component';
import { CreatePostModule } from '../create-post/create-post.module';
import { MaterialModule } from '../material/material.module';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { SharePostComponent } from '../share-post/share-post.component';

@NgModule({
  declarations: [
    PostsContainerComponent,
    PostComponent,
    DeleteDialogComponent,
    EditPostComponent,
    SharePostComponent,
  ],
  imports: [CommonModule, FormsModule, CreatePostModule, MaterialModule],
  exports: [PostsContainerComponent],
})
export class PostsContainerModule {}
