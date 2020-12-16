import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPhotosComponent } from './account-photos.component';
import { PhotoViewerModule } from '../photo-viewer/photo-viewer.module';

@NgModule({
  declarations: [AccountPhotosComponent],
  imports: [CommonModule, PhotoViewerModule],
  exports: [AccountPhotosComponent],
})
export class AccountPhotosModule {}
