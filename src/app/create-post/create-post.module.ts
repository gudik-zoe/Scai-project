import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { FormsModule } from '@angular/forms';
import { AutoFocusModule } from '../directives/auto-focus.module';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [CommonModule, FormsModule, AutoFocusModule],
  exports: [CreatePostComponent],
})
export class CreatePostModule {}
