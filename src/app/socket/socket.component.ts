// import { Component, OnInit } from '@angular/core';
// import * as SockJS from 'sockjs-client';
// import $ from 'jquery';
// import * as Socket from 'socket.io-client';
// import * as Stomp from 'stompjs/lib/stomp.js';

// @Component({
//   selector: 'app-socket',
//   templateUrl: './socket.component.html',
//   styleUrls: ['./socket.component.css'],
// })
// export class SocketComponent implements OnInit {
//   private serverUrl = 'http://localhost:8080/socket';
//   private title = 'WebSockets chat';
//   private stompClient;
//   constructor() {
//     this.initializeWebSocketConnection();
//   }

//   initializeWebSocketConnection() {
//     let ws = new SockJS(this.serverUrl);
//     this.stompClient = Stomp.over(ws);
//     let that = this;
//     this.stompClient.connect({}, function (frame) {
//       that.stompClient.subscribe('/chat', (message) => {
//         if (message.body) {
//           $('.chat').append("<div class='message'>" + message.body + '</div>');
//           console.log(message.body);
//         }
//       });
//     });
//   }

//   sendMessage(message) {
//     this.stompClient.send('/app/send/message', {}, message);
//     $('#input').val('');
//   }

//   // initializeWebSocketConnection() {
//   //   let ws = new Socket(this.serverUrl);

//   //   this.stompClient = Stomp.over(ws);
//   //   let that = this;
//   //   this.stompClient.connect({}, function (frame) {
//   //     that.stompClient.subscribe('/test', function (message) {
//   //       if (message.body) {
//   //         console.log(message.body);
//   //         window.location.reload();
//   //       }
//   //     });

//   //     that.stompClient.subscribe('/operation', function (message) {
//   //       if (message.body) {
//   //         console.log(message.body);
//   //         window.location.reload();
//   //       }
//   //     });
//   //   });
//   // }

//   ngOnInit(): void {}
// }
