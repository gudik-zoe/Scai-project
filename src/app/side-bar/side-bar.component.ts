import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(private storageService: StorageService, private route: Router) {}
  image() {
    return this.storageService.getImage();
  }

  getUserName() {
    return this.storageService.getName();
  }
  ngOnInit(): void {}
}
