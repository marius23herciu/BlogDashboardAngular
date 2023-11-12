import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseApiUrl = 'https://localhost:7246'

  constructor(private http: HttpClient) { }

addCategory(category: string): Observable<boolean> {
  return this.http.post<boolean>(this.baseApiUrl + '/api/categories/' + category, category)
 }

editCategory(oldCategory: string, newCategory: string): Observable<boolean> {
  return this.http.put<boolean>(this.baseApiUrl + '/api/categories/edit-' + oldCategory + '-to-' + newCategory, newCategory)
 }

loadCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.baseApiUrl + '/api/categories' )
}

deleteCategory(category: string) {
  return this.http.delete<boolean>(this.baseApiUrl + '/api/categories/' + category)
 }

}
