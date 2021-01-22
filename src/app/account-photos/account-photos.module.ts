import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPhotosComponent } from './account-photos.component';
import { MaterialModule } from '../material/material.module';
import { PhotoViewerComponent } from '../photo-viewer/photo-viewer.component';

@NgModule({
  declarations: [AccountPhotosComponent, PhotoViewerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [AccountPhotosComponent],
})
export class AccountPhotosModule {}
