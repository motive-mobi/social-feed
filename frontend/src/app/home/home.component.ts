import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  submitted: any;
  throttle = 500;
  distance = 2;
  page = 0; /* controla o início e continuidade da paginação */
  limit = 1; /* controla o número de itens retornados pela API */

  constructor(private api: ApiService, private confirmBoxEvokeService: ConfirmBoxEvokeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getPosts(this.page, this.limit);

    this.submitted = true;

    this.formData = this.formBuilder.group({
      id: [''],
      author: ['', Validators.required],
      description: [''],
      image: [null]
    });

  }

  onScroll(): void {
    this.page++;
    this.getPosts(this.page, this.limit);
  }

  getPosts(page: any, limit: any): void {
    this.api.getPosts(page, limit)
    .subscribe(Response => {

      this.posts.push(...Response);
      console.log("getPosts Response: ", Response);
      this.formData = this.formBuilder.group({
        id: [''],
        author: ['', Validators.required],
        description: [''],
        image: [null]
      });
    });
  }

  getPostById(postId: any): void {

    this.api.getPostById(postId)
    .subscribe(Response => {
      this.post = Response

      this.formData = this.formBuilder.group({
        id: [this.post[0].id],
        author: [this.post[0].author, Validators.required],
        description: [this.post[0].description],
        image: [null]
      });
    })
  }

  onClickSubmitCreate(data: any): void {

    /** validação do campo author (required) **/
    if( this.formData.get('author')?.errors?.['required'] ) {
      this.submitted = false;
      return;
    }

    this.api.createPost(data)
    .subscribe(Response => {
      (<HTMLInputElement>document.getElementById("closeCreateModal")).click();
      this.posts = [];
      this.page = 0;
      this.getPosts(this.page, this.limit);
      /*this.getPosts(this.page);*/
    });
  }

  onFileSelected(event: any): void {
    const file:File = event.target.files[0];

    if( file ){
      this.formData.value.image = file;
    }
  }

  onClickSubmitEdit(data: any): void {

    /** validação do campo author (required) **/
    if( this.formData.get('author')?.errors?.['required'] && this.formData.get('author')?.touched ) {
      this.submitted = false;
      return;
    }

    this.api.updatePost(data)
    .subscribe(Response => {
      (<HTMLInputElement>document.getElementById("closeEditModal")).click();
      this.posts = [];
      this.page = 0;
      this.getPosts(this.page, this.limit);
    });
  }

  deletePost(postId: any): void {

    this.confirmBoxEvokeService.success('Atenção', 'Deseja remover este post? Esta operação não pode ser desfeita.', 'Remover', 'Cancelar')
    .subscribe(resp => {
      if( resp.clickedButtonID == "remover" ){
        this.api.deletePost(postId)
        .subscribe(Response => {
          this.posts = [];
          this.page = 0;
          this.getPosts(this.page, this.limit);
        })
      };
    });
  }

  dismissForm(): void {

    this.formData = this.formBuilder.group({
      id: [''],
      author: ['', Validators.required],
      description: [''],
      image: [null]
    });

    this.submitted = true;

    (<HTMLInputElement>document.getElementById("closeEditModal")).click();
    (<HTMLInputElement>document.getElementById("closeCreateModal")).click();
  }

}
