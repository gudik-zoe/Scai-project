import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoggedUserGuard } from './logged-user.guard';

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
    path: 'description',
    loadChildren: () =>
      import('./description/description.module').then(
        (m) => m.DescriptionModule
      ),
  },

  {
    path: 'user-profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'account-settings',
    loadChildren: () =>
      import('./account-settings/account.settings.module').then(
        (m) => m.AccountSettingsModule
      ),
  },
  {
    path: 'nav-bar',
    loadChildren: () =>
      import('./nav-bar/nav-bar.module').then((m) => m.NavBarModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'pagesContainer',
    loadChildren: () =>
      import('./pages-container/pages-container.module').then(
        (m) => m.PagesContainerModule
      ),
  },
  {
    path: 'createPage',
    loadChildren: () =>
      import('./create-page/create-page.module').then(
        (m) => m.CreatePageModule
      ),
  },
  {
    path: 'user-pages',
    loadChildren: () =>
      import('./user-pages/user-pages.module').then((m) => m.UserPagesModule),
  },
  {
    path: 'user-events',
    loadChildren: () =>
      import('./user-events/user-events.module').then(
        (m) => m.UserEventsModule
      ),
  },
  {
    path: 'eventsContainer',
    loadChildren: () =>
      import('./events-container/events-container.module').then(
        (m) => m.EventsContainerModule
      ),
  },
  {
    path: 'createEvent',
    loadChildren: () =>
      import('./create-event/create-event.module').then(
        (m) => m.CreateEventModule
      ),
  },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
