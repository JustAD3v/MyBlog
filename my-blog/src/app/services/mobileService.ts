import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  isMobile = signal(false);

  setMobile(state: boolean): void {
    this.isMobile.set(state);
  }
}

