import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MaterialModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
