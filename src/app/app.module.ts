import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//  import { LogInComponent } from './log-in/log-in.component';
//  import { HomePageComponent } from './home-page/home-page.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { DescriptionComponent } from './description/description.component';
import { AuthenticationGuard } from './authentication.guard';
// import { MyFriendsComponent } from './my-friends/my-friends.component';
// import { AddFriendsComponent } from './add-friends/add-friends.component';


@NgModule({
  declarations: [
    AppComponent,
    //  LogInComponent,
    // AccountSettingsComponent,
    //  HomePageComponent,
    // UserProfileComponent,
    DescriptionComponent,
    // MyFriendsComponent,
    // AddFriendsComponent,
  
  ],
  imports: [ReactiveFormsModule, FormsModule, BrowserModule, AppRoutingModule],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
