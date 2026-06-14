import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BannerComponent } from './components/banner/banner.component';
import { BannerToggleService } from './services/bannerToggle.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, BannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(bp: BreakpointObserver, bannerService: BannerToggleService) {
    bp.observe(["(max-width: 768px)"]).subscribe(result => bannerService.setMobileMode(result.matches));
  }
}
