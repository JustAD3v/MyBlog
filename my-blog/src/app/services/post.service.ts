import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  private readonly posts = [
    { id: 1, title: 'La bonne recette', summary: 'Pwn challenge from 404CTF 2026' },
    { id: 2, title: 'Fascinant Travaux de Gallois', summary: 'Pwn challenge from 404CTF 2026' },
    { id: 3, title: 'Jeu de la Heap', summary: 'Pwn challenge from 404CTF 2026' },
    { id: 4, title: "Dejeuner à l'ANSSI", summary: 'Crypto challenge from 404CTF 2026' },
    { id: 5, title: "Pas très discret", summary: 'Crypto challenge from 404CTF 2026' },
    { id: 6, title: "Spidersaurus", summary: 'Pwn challenge from FCSC 2026' },
  ];

  getPost(id: string): Observable<string> {
    return this.http.get(`posts/post${id}`, {responseType: 'text'});
  }

  getPosts() {
    return this.posts;
  }
}