import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseApiUrl = 'https://localhost:7246'

  constructor(private http: HttpClient) { }

  uploadImage(selectedImg: ImageData, postData: Post, formstatus:string,  router: Router){
    //vezi cum stockezi imagini in mssql
    const filePath = `postIMG/${Date.now()}`  //poate ai nevoie de filePath, era in tutorial...
    console.log(filePath)
    //ar trebui sa trimiti selectedImg si filePath...cam asa
    // return this.http.post<any>(this.baseApiUrl + '/api/quests/quest-' + filePath , selectedImg)
    //sau poate e cu totul alta metoda, vezi tu...
    //nu stiu daca o sa ajute, dar daca nu gasesti altceva, cauta in  tutorialul de angular pt blog
    //pe care l-ai folosit pe la 06:15:00
    //mai e ceva la care trebuie sa te uiti pe la 07:08:00
    //are legatura cu formStatus de la parametri
    if(formstatus=='Edit'){
     // this.updatePost(5, postData)
    }
    else{
      this.createPost(postData)
    }
  }

  deleteImage(postImagePath: string): Observable<string> {
    //poate nu e nevoie de asta aici...doar stergi  imaginea in backend in deletePost...sa incepi de acolo
    
      return this.http.get<string>('/api/quests/' )
  }
  deletePost(id: string): Observable<boolean> {
      return this.http.delete<boolean>(this.baseApiUrl + '/api/posts/' + id)
  }

  loadPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseApiUrl + '/api/posts' )
}

loadPostsByCategory(category: string): Observable<Post[]> {
  return this.http.get<Post[]>(this.baseApiUrl + '/api/posts/by-' + category )
}

loadPostsBySearching(search: string): Observable<Post[]> {
  return this.http.get<Post[]>(this.baseApiUrl + '/api/posts/' + search )
}

  createPost(postData: Post): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/posts' , postData)
  }
  

  loadPostById(id:string, reload: boolean):Observable<Post> {
    return this.http.get<Post>(this.baseApiUrl + '/api/posts/post-' + id + '-' + reload )
  }
  

  markFeatured(id: string): Observable<boolean> {
    return this.http.put<boolean>(this.baseApiUrl + '/api/posts/' + id + '-mark-featured', id)
}

unmarkFeatured(id: string): Observable<boolean> {
  return this.http.put<boolean>(this.baseApiUrl + '/api/posts/' + id + '-unmark-featured', id)
}
}
