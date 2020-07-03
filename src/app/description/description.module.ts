import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: ':id', component: DescriptionComponent }];
@NgModule({
  declarations: [DescriptionComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DescriptionModule {}
