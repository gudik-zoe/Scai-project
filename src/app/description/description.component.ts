import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class DescriptionComponent implements OnInit {
  imgUrl: string = environment.rootUrl + 'files/';
  dbPosts;
  id: number;
  postLikersList: object;

  constructor(
    private postsService: PostsService,
    private aroute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  // getPosts() {
  //   this.postsService.getPosts().subscribe((data: any) => {
  //     this.dbPosts = data;
  //     for (let i of this.dbPosts) {
  //       this.accountService
  //         .getBasicAccountDetails(i.accountIdAccount)
  //         .subscribe((u) => {
  //           i.sharedBy = u;
  //         });

  //       for (let j of i.comments) {
  //         this.accountService
  //           .getBasicAccountDetails(j.accountIdAccount)
  //           .subscribe((c) => {
  //             j.commentedBy = c;
  //           });
  //       }
  //       for (let k of i.postLikes) {
  //         this.accountService
  //           .getBasicAccountDetails(k.accountIdAccount)
  //           .subscribe((l) => {
  //             k.likedBy = l;
  //           });
  //       }
  //     }
  //     console.log(this.dbPosts);
  //   });
  // }
  async getPosts() {
    this.dbPosts = await this.postsService.getPosts2();
  }

  ngOnInit() {
    this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
    this.getPosts();
  }
}
