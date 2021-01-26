import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [{ path: '', component: CreateEventComponent }];
@NgModule({
  declarations: [CreateEventComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CreateEventModule {}
