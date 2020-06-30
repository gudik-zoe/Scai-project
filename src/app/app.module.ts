import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DescriptionComponent } from './description/description.component';
import { AuthenticationGuard } from './authentication.guard';
import { MessengerComponent } from './messenger/messenger.component';
import { EventComComponent } from './event-com/event-com.component';
import { PagesCoComponent } from './pages-co/pages-co.component';

@NgModule({
  declarations: [
    AppComponent,
    DescriptionComponent,
    MessengerComponent,
    EventComComponent,
    PagesCoComponent,
  ],
  imports: [ReactiveFormsModule, FormsModule, BrowserModule, AppRoutingModule],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
