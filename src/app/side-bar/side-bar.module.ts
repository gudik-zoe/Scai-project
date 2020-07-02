import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';
import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [{ path: '', component: SideBarComponent }];
@NgModule({
  declarations: [SideBarComponent],
  imports: [CommonModule, RouterModule],
  exports: [SideBarComponent],
})
export class SideBarModule {}
