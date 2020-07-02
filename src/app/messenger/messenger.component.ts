import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../log-in/auth.service';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessengerComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private storageService: StorageService,
    private aroute: ActivatedRoute,
    private route: Router,
    private chat: ChatService
  ) {}

  // audio = new Audio('../../assets/Registrazione.m4a');
  // play() {
  //   this.audio.play();
  // }
  users = this.auth.localStorageArray;
  currentUser = JSON.parse(localStorage.getItem('key'));
  id = null;
  inputData;
  messageTo;
  sentMessage;
  error;
  foto;
  audio;
  audioFile;
  audioProva;
  playing = false;
  messages = this.auth.localStorageArray[this.currentUser].messages;
  ok() {
    this.error = false;
  }
  navigate(id: number) {
    this.id = id;
  }
  open(id: number) {
    this.id = id;
  }

  audioUpload(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.audioFile = event.target.result;
    };
  }
  playProva() {
    this.audioProva = new Audio();
    this.audioProva.src = this.audioFile;
    this.audioProva.load();
    this.audioProva.play();
    this.playing = true;
  }
  stopProva() {
    this.audioProva.pause();
    this.playing = false;
  }
  play(data) {
    this.audio = new Audio();
    this.audio.src = data;
    this.audio.load();
    this.audio.play();
    this.playing = true;
  }
  stop(data) {
    this.audio.src = data;
    this.audio.pause();
  }

  send(id: number, data: string, foto: ImageBitmap, audio: AudioBuffer) {
    foto = this.foto;
    audio = this.audioFile;
    if (
      this.inputData === '' ||
      this.inputData === ' ' ||
      (this.inputData == null && !foto && !audio)
    ) {
      this.error = true;
    } else {
      this.chat.send(id, data, foto, audio);
      this.error = false;
      this.foto = null;
      this.inputData = null;
      this.id = null;
      this.audioFile = null;
      this.playing = false;
    }
  }

  uploadImage(event) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.foto = event.target.result;
      };
    }
  }

  ngOnInit() {}
}
