import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages/pages.module';
import { PagesComponent } from '../pages/pages.component';
import { SideBarModule } from '../side-bar/side-bar.module';
import { PagesContainerComponent } from './pages-container.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: PagesContainerComponent }];

@NgModule({
  declarations: [PagesContainerComponent],
  imports: [
    CommonModule,
    PagesModule,
    SideBarModule,
    RouterModule.forChild(routes),
  ],
  exports: [PagesContainerComponent],
})
export class PagesContainerModule {}
