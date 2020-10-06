import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrls: ['./friend-info.component.css']
})
export class FriendInfoComponent implements OnInit {
  constructor(private accountService: AccountService, private route: Router, private aroute: ActivatedRoute,) { }
  id: number
  requestedUser;

  getUserById() {
    this.accountService.getAccountById(this.id).subscribe((data) => {
      this.requestedUser = data;
    });
  }


  ngOnInit(): void {
    this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
  }

}
