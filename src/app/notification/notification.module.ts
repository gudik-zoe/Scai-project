import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
