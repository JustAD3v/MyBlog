import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { SafeHtmlPipe } from '../../pipes/safehtml.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.css"
})
export class PostComponent{
  content = 'wait...';

  constructor(private route: ActivatedRoute, private postService: PostService) {
    const id = this.route.snapshot.paramMap.get('id'); // get id from URL
    if (id) {
      this.postService.getPost(id).subscribe(html => {
        this.content = html; // HTML injected in the component's html
        
        setTimeout(() => this.initImageZoom());
      });
    }
  }

  /* for image zoom */
  initImageZoom() {
    const container = document.querySelector(".post-container")!;
    const lightbox = document.getElementById('lightbox')!;
    const lightboxImg = document.getElementById('lightboxImg')! as HTMLImageElement;

    container.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;

        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
      }
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightboxImg.src = '';
    });
  }
}
