import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts = [
    { id: 1, title: 'Mon premier article', summary: 'Petit résumé du premier article.' },
    { id: 2, title: 'Deuxième article', summary: 'Aperçu du deuxième article.' }
  ];
}