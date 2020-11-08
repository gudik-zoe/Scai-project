import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEmailPassComponent } from './change-email-pass.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangeEmailPassComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ChangeEmailPassComponent],
})
export class ChangeEmailPassModule {}
