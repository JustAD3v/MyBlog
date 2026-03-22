import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { SafeHtmlPipe } from '../pipes/safehtml.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.css"
})
export class PostComponent {
  content = '';

  constructor(private route: ActivatedRoute, private postService: PostService) {
    const id = this.route.snapshot.paramMap.get('id'); // récupère l'id dans l'URL
    if (id) {
      this.postService.loadPost(`article${id}.md`).subscribe(html => {
        this.content = html; // le HTML est injecté dans le template
      });
    }
  }
}