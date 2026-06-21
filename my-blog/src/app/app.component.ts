import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BannerComponent } from './components/banner/banner-desktop/banner.component';
import { MobileService } from './services/mobileService';
import { BannerMobileComponent } from './components/banner/banner-mobile/banner-mobile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, BannerComponent, BannerMobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isMobile: boolean = false;
  constructor(bp: BreakpointObserver, public mbService: MobileService) {
    bp.observe(["(max-width: 768px)"]).subscribe(result => mbService.setMobile(result.matches));
  }
}
