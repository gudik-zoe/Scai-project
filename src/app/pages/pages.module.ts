import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SideBarModule } from '../side-bar/side-bar.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: PagesComponent }];

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, SideBarModule, RouterModule.forChild(routes)],
  exports: [PagesComponent],
})
export class PagesModule {}
