import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerToggleService {
  isMobile: boolean = false;
  isOpen: boolean = false;

  toggleBanner(): void {
    this.isOpen = !this.isOpen;
  }

  setMobileMode(mobile: boolean): void {
    this.isMobile = mobile;
  }
}

