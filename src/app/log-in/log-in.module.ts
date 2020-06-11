import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes , RouterModule} from '@angular/router';
import { LogInComponent } from './log-in.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path:'' , component:LogInComponent}
]


@NgModule({
  declarations: [LogInComponent],
  imports: [ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LogInModule { }
