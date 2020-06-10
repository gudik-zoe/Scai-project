import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
posts = []
id
  constructor(private service:PostsService , private aroute:ActivatedRoute) { }

  ngOnInit() {
    this.posts = this.service.getPosts()
    this.id =  parseInt(this.aroute.snapshot.paramMap.get('id'))

  }

}
