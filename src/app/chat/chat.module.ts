import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { RouterModule, Routes } from '@angular/router';
import { FriendsContainerModule } from '../friends-container/friends-container.module';

const routes: Routes = [{ path: 'chat', component: ChatComponent }];
@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FriendsContainerModule,
  ],
  exports: [ChatComponent],
})
export class ChatModule {}
