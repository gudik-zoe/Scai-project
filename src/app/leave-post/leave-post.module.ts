import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavePostComponent } from './leave-post.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LeavePostComponent],
  imports: [CommonModule, FormsModule],
  exports: [LeavePostComponent],
})
export class LeavePostModule {}
