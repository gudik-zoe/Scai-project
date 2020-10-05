import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: ':id', component: MessengerComponent }];
@NgModule({
  declarations: [MessengerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class MessengerModule { }
