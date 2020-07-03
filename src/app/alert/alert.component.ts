import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private postsService: PostsService
  ) {}
  foto;
  image() {
    return this.storageService.getImage();
  }
  user() {
    return this.storageService.getName();
  }
  fullname() {
    return (
      this.storageService.getName() + ' ' + this.storageService.getLastName()
    );
  }

  close() {
    this.postsService.close.next(false);
  }
  uploadImage(event): void {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.foto = event.target.result;
      };
    }
  }

  post(data: string): void {
    this.postsService.post(data, this.foto);
    this.inputData = undefined;
    this.postsService.close.next(false);
  }
  inputData;
  ngOnInit(): void {}
}
