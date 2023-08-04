import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
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
  post: Post[] = [];
  formData: any;

  constructor(private api: ApiService, private confirmBoxEvokeService: ConfirmBoxEvokeService) { }

  ngOnInit(): void {
    this.getPosts();

    this.formData = new FormGroup({
      id: new FormControl(""),
      /*author: new FormControl("", Validators.required),*/
      author: new FormControl(""),
      description: new FormControl(""),
      image: new FormControl(""),
   });
  }

  getPosts(): void {
    this.api.getPosts()
    .subscribe(Response => {
      /*console.log('Response', Response)*/
      /*this.res = Response;*/
      this.posts = Response;
      /*console.log("this.posts: ", this.posts)*/
      this.formData = new FormGroup({
        id: new FormControl(""),
        author: new FormControl(""),
        description: new FormControl(""),
        image: new FormControl(""),
     });
    });
  }

  getPostById(postId: any): void {
    /*console.log('Post id: ', postId)*/
    this.api.getPostById(postId)
    .subscribe(Response => {
      this.post = Response
      /*console.log('getPostById response: ', Response)
      console.log('this.post: ', this.post[0].id)*/
      this.formData = new FormGroup({
        id: new FormControl(this.post[0].id),
        author: new FormControl(this.post[0].author),
        description: new FormControl(this.post[0].description),
        image: new FormControl(""),
     });
    })
  }

  onClickSubmitCreate(data: any): void {
    /*console.log("Form data: ", data)*/
    this.api.createPost(data)
    .subscribe(Response => {
      /*console.log("onClickSubmitCreate: ", Response)*/
      (<HTMLInputElement>document.getElementById("closeCreateModal")).click();
      this.getPosts();
    });
  }

  onClickSubmitEdit(data: any): void {
    /*console.log("Form data: ", data)*/
    this.api.updatePost(data)
    .subscribe(Response => {
      /*console.log("onClickSubmitEdit Response: ", Response);*/
      (<HTMLInputElement>document.getElementById("closeEditModal")).click();
      this.getPosts();
    });
  }

  deletePost(postId: any): void {
    console.log('deletePost id: ', postId);
    this.confirmBoxEvokeService.success('Atenção', 'Deseja remover este post? Esta operação não pode ser desfeita.', 'Remover', 'Cancelar')
    .subscribe(resp => {
      console.log('resp', resp);
      if( resp.clickedButtonID == "remover" ){
        this.api.deletePost(postId)
        .subscribe(Response => {
          this.getPosts();
    
          /*console.log('this.post: ', this.post[0].id)*/
          /*this.formData = new FormGroup({
            id: new FormControl(this.post[0].id),
            author: new FormControl(this.post[0].author),
            description: new FormControl(this.post[0].description),
            image: new FormControl(""),
         });*/
        })
      };
    });
  }

}
