import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Navbar } from './component/navbar/navbar';
import { Footer } from './component/footer/footer';
import { SocialMedia } from './component/shared/social-media/social-media';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, SocialMedia, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Glamfit');
  isLoading = signal(true);
  isClosing = signal(false);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isClosing.set(false);
        this.isLoading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Force the loader to stay visible for a cinematic moment
        setTimeout(() => {
          this.isClosing.set(true);
          setTimeout(() => {
            this.isLoading.set(false);
            this.isClosing.set(false);
          }, 800); // Wait for fade-out animation to complete
        }, 1000); // Minimum time to show the luxury logo
      }
    });
  }

  get isAdminPage(): boolean {
    return this.router.url.startsWith('/admin') || this.router.url.startsWith('/manager');
  }
}
