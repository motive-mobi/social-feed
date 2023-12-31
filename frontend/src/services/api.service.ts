import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class ApiService {
    private apiUrl = 'http://localhost:8000/api/';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Accept': 'application/json' })
    };

    constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET - recupera todos os posts **/
  getPosts(page: any, limit: any): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl+'posts/?page='+page+'&limit='+limit)
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }
  /** POST - envia os dados do novo post **/
  createPost(data: any): Observable<Post[]> {
    let data1 = new FormData();
    data1.append("author", data.author);
    data1.append("description", data.description);
    data1.append("image", data.image);
    return this.http.post<Post[]>(this.apiUrl+'posts/create/', data1)
      .pipe(
        tap(_ => this.log('created post')),
        catchError(this.handleError<Post[]>('postPost', []))
      );
  }
  /** POST - recupera os dados do post pelo id **/
  getPostById(postId: any): Observable<Post[]> {
    return this.http.post<Post[]>(this.apiUrl+'posts/edit/', postId)
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }
    /** POST - atualiza os dados do post (update) **/
    updatePost(data: any): Observable<Post[]> {
      let data1 = new FormData();
      data1.append("id", data.id);
      data1.append("author", data.author);
      data1.append("description", data.description);
      data1.append("image", data.image);
      return this.http.post<Post[]>(this.apiUrl+'posts/update/', data1)
        .pipe(
          tap(_ => this.log('created post')),
          catchError(this.handleError<Post[]>('postPost', []))
        );
    }
    /** POST - deleta o post **/
    deletePost(postId: any): Observable<Post[]> {
      return this.http.post<Post[]>(this.apiUrl+'posts/delete/', postId)
        .pipe(
          tap(_ => this.log('deleted post')),
          catchError(this.handleError<Post[]>('postPost', []))
        );
    }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`apiService: ${message}`);
  }

}