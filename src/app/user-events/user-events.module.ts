import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEventsComponent } from './user-events.component';
import { RouterModule, Routes } from '@angular/router';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: ':id', component: UserEventsComponent }];

@NgModule({
  declarations: [UserEventsComponent, EditEventComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class UserEventsModule {}
