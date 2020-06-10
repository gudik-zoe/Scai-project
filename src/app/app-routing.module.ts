import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DescriptionComponent } from './description/description.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'auth', component: LogInComponent },
  { path: 'home-page', component: HomePageComponent , canActivate:[AuthenticationGuard] },
  { path: 'description/:id', component: DescriptionComponent },
  {path:'user-profile' , component:UserProfileComponent},
  { path: 'account-settings', component: AccountSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
