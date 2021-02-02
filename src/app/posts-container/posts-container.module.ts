import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { PostsContainerComponent } from './posts-container.component';
import { CreatePostModule } from '../create-post/create-post.module';
import { MaterialModule } from '../material/material.module';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SharePostComponent } from '../share-post/share-post.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PostsContainerComponent,
    PostComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    SharePostComponent,
    ShareDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CreatePostModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [PostsContainerComponent],
})
export class PostsContainerModule {}
