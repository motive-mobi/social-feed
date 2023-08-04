import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/post';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Posts';
  posts: Post[] = [];
  res: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.api.getPosts()
    .subscribe(Response => {
      this.res = Response;
      this.posts = this.res.list;
      console.log("this.posts: ", this.posts)
    });
  }

}
