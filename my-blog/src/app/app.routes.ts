import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PostComponent } from './components/post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts/:id', component: PostComponent }
];