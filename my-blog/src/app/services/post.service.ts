import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  loadPost(filename: string): Observable<string> {
    return this.http.get(`posts/${filename}`, { responseType: 'text' })
      .pipe(
        map(md => marked.parse(md) as string)
      );
  }
}