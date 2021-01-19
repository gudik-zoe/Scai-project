import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsContainerComponent } from './events-container.component';
import { EventComponent } from '../event/event.component';
import { SideBarModule } from '../side-bar/side-bar.module';
import { RouterModule, Routes } from '@angular/router';
import { UserEventsModule } from '../user-events/user-events.module';

const routes: Routes = [{ path: '', component: EventsContainerComponent }];

@NgModule({
  declarations: [EventsContainerComponent, EventComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SideBarModule],
})
export class EventsContainerModule {}
