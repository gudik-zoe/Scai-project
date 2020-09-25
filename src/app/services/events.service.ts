import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private storageService: StorageService) {}

  userStatus = [];

  going(id: number): void {
    if (this.events[id].going[0].clicked) {
      this.events[id].going[0].number = this.events[id].going[0].number - 1;
      this.events[id].going[0].clicked = false;
      this.userStatus = this.userStatus.filter((item) => item.id !== id);
    } else {
      this.events[id].going[0].number = this.events[id].going[0].number + 1;
      this.events[id].going[0].clicked = true;
      this.userStatus.push({
        user:
          this.storageService.getName() +
          ' ' +
          this.storageService.getLastName(),
        status: 'going to',
        event: this.events[id].text,
        image: this.events[id].image,
        id: id,
      });
    }
  }

  interested(id: number): void {
    if (this.events[id].interested[0].clicked) {
      this.events[id].interested[0].number =
        this.events[id].interested[0].number - 1;
      this.events[id].interested[0].clicked = false;
      this.userStatus = this.userStatus.filter((item) => item.id !== id);
    } else {
      this.events[id].interested[0].number =
        this.events[id].interested[0].number + 1;
      this.events[id].interested[0].clicked = true;
      this.userStatus.push({
        user:
          this.storageService.getName() +
          ' ' +
          this.storageService.getLastName(),
        status: 'intrested in',
        event: this.events[id].text,
        image: this.events[id].image,
        id: id,
      });
    }
  }

  notInterested(id: number): void {
    if (this.events[id].notInterested[0].clicked) {
      this.events[id].notInterested[0].number =
        this.events[id].notInterested[0].number - 1;
      this.events[id].notInterested[0].clicked = false;
      this.userStatus = this.userStatus.filter((item) => item.id !== id);
    } else {
      this.events[id].notInterested[0].number =
        this.events[id].notInterested[0].number + 1;
      this.events[id].notInterested[0].clicked = true;
    }
  }

  events = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR69e17FF_3eh6zZ79VWQiCp28G8BdaWViVVQ&usqp=CAU',
      text: 'Summer Color Beach Party!',
      id: 0,
      clicked: false,
      going: [{ number: 114, clicked: false }],
      interested: [{ number: 200, clicked: false }],
      notInterested: [{ number: 10, clicked: false }],
    },
    {
      image:
        'https://windeurope.org/summit2018/wp-content/uploads/gws-summit-2018-banner-plenary.jpg',
      text: 'WindEurope 2020 Conference at the global Wind Summit',
      id: 1,
      clicked: false,
      going: [{ number: 50, clicked: false }],
      interested: [{ number: 35, clicked: false }],
      notInterested: [{ number: 10, clicked: false }],
    },
    {
      image:
        'https://mms.businesswire.com/media/20140716005334/en/424281/5/Muse_concert.jpg',
      text: 'Muse Live at Rome Olympic Stadium',
      id: 2,
      clicked: false,
      going: [{ number: 114, clicked: false }],
      interested: [{ number: 800, clicked: false }],
      notInterested: [{ number: 200, clicked: false }],
    },
  ];
}
