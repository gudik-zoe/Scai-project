import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { FormsModule } from '@angular/forms';
import { EditPostModule } from '../edit-post/edit-post.module';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, FormsModule, EditPostModule],
  exports: [PostComponent],
})
export class PostModule {}
