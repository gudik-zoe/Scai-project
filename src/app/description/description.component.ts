import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class DescriptionComponent implements OnInit {
  posts: any[] = [];
  id: number;
  constructor(private service: PostsService, private aroute: ActivatedRoute) {}

  ngOnInit() {
    this.posts = this.service.posts;
    this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
  }
}
