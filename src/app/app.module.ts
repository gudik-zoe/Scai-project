import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MyInterceptor } from './my-interceptor';
import { AuthenticationGuard } from './authentication.guard';
import { NotificationComponent } from './notification/notification.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { EditPostModule } from './edit-post/edit-post.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavBarModule,
    FriendRequestModule,
    NotificationModule,
    EditPostModule,
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
