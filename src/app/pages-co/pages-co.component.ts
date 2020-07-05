import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-pages-co',
  templateUrl: './pages-co.component.html',
  styleUrls: ['./pages-co.component.css'],
})
export class PagesCoComponent implements OnInit {
  constructor(
    private pagesService: PagesService,
    private postsService: PostsService
  ) {}
  pages: any[] = [];
  posts: any[] = [];
  ngOnInit() {
    this.pages = this.pagesService.pages;
    this.posts = this.postsService.posts;
  }
  like(id: number, text: string): void {
    this.pagesService.like(id, text);
  }
}
