import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavePostComponent } from './leave-post.component';
import { FormsModule } from '@angular/forms';
import { AutoFocusModule } from '../directives/auto-focus.module';

@NgModule({
  declarations: [LeavePostComponent],
  imports: [CommonModule, FormsModule, AutoFocusModule],
  exports: [LeavePostComponent],
})
export class LeavePostModule {}
