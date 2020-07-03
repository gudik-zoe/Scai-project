import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './authentication.guard';
// import { AlertComponent } from './alert/alert.component';
// import { DescriptionComponent } from './description/description.component';
// import { MessengerComponent } from './messenger/messenger.component';
// import { EventComComponent } from './event-com/event-com.component';
// import { PagesCoComponent } from './pages-co/pages-co.component';
// import { HomePageComponent } from './home-page/home-page.component';
// import { SideBarComponent } from './side-bar/side-bar.component';
// import { MyFriendsComponent } from './my-friends/my-friends.component';
// import { MyFriendsModule } from './my-friends/my-friends.module';
// // import { SideBarModule } from './side-bar/side-bar.module';
// import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    // AlertComponent,
    // DescriptionComponent,
    // MessengerComponent,
    // EventComComponent,
    // PagesCoComponent,
    // HomePageComponent,
    // SideBarComponent,
    // MyFriendsComponent,
  ],
  imports: [ReactiveFormsModule, FormsModule, BrowserModule, AppRoutingModule],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
