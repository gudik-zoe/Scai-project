import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharePostComponent } from './share-post.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SharePostComponent],
  imports: [CommonModule, FormsModule],
  exports: [SharePostComponent],
})
export class SharePostModule {}
