import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesCoComponent } from './pages-co.component';
import { SideBarModule } from '../side-bar/side-bar.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PagesCoComponent }];
@NgModule({
  declarations: [PagesCoComponent],
  imports: [
    CommonModule,
    SideBarModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
})
export class PagesCoModule {}
