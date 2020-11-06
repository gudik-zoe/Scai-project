import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';
import { LoggedUserGuard } from './logged-user.guard';
// import { SocketComponent } from './socket/socket.component';

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

  {
    path: 'description',
    loadChildren: () =>
      import('./description/description.module').then(
        (m) => m.DescriptionModule
      ),
  },
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
  // { path: 'socket', component: SocketComponent },

  {
    path: 'account-settings',
    loadChildren: () =>
      import('./account-settings/account-settings.module').then(
        (m) => m.AccountSettingsModule
      ),
  },
  {
    path: 'nav-bar',
    loadChildren: () =>
      import('./nav-bar/nav-bar.module').then((m) => m.NavBarModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
