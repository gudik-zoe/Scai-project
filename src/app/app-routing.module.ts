import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DescriptionComponent } from './description/description.component';
import { AuthenticationGuard } from './authentication.guard';
import { LoggedUserGuard } from './logged-user.guard';
import { MessengerComponent } from './messenger/messenger.component';
import { EventComComponent } from './event-com/event-com.component';
import { PagesCoComponent } from './pages-co/pages-co.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./log-in/log-in.module').then((m) => m.LogInModule),
    canActivate: [LoggedUserGuard],
  },

  {
    path: 'home-page',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'event-com',
    loadChildren: () =>
      import('./event-com/event-com.module').then((m) => m.EventComModule),
  },
  // { path: 'description/:id', component: DescriptionComponent },

  {
    path: 'messenger',
    loadChildren: () =>
      import('./messenger/messenger.module').then((m) => m.MessengerModule),
  },

  {
    path: 'user-profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'event-com',
    loadChildren: () =>
      import('./event-com/event-com.module').then((m) => m.EventComModule),
  },
  {
    path: 'pages-co',
    loadChildren: () =>
      import('./pages-co/pages-co.module').then((m) => m.PagesCoModule),
  },

  {
    path: 'account-settings',
    loadChildren: () =>
      import('./account-settings/account-settings.module').then(
        (m) => m.AccountSettingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
