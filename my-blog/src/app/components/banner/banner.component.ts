import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BannerToggleService } from '../../services/bannerToggle.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./banner.component.html",
  styleUrls: ['./banner.component.css']
})

export class BannerComponent {
  bannerService = inject(BannerToggleService);

  toggle() {
    if (this.bannerService.isMobile) {
      console.log("clicked on mobile !")
      this.bannerService.toggleBanner();
    }
  }
}