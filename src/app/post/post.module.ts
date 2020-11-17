import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { FormsModule } from '@angular/forms';
import { DeletePostModule } from '../delete-post/delete-post.module';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, FormsModule],
  exports: [PostComponent],
})
export class PostModule {}
