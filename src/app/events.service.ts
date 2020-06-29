import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  events = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR69e17FF_3eh6zZ79VWQiCp28G8BdaWViVVQ&usqp=CAU',
      text: 'Summer Color Beach Party!',
      id: 0,
    },
    {
      image:
        'https://windeurope.org/summit2018/wp-content/uploads/gws-summit-2018-banner-plenary.jpg',
      text: 'WindEurope 2020 Conference at the global Wind Summit',
      id: 1,
    },
    {
      image:
        'https://mms.businesswire.com/media/20140716005334/en/424281/5/Muse_concert.jpg',
      text: 'Muse Live at Rome Olympic Stadium',
      id: 2,
    },
  ];
}
