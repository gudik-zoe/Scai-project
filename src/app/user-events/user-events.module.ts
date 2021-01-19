import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEventsComponent } from './user-events.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: ':id', component: UserEventsComponent }];

@NgModule({
  declarations: [UserEventsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserEventsModule {}
