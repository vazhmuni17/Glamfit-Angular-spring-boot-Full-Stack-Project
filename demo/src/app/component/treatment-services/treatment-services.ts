import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Instagram } from '../shared/instagram/instagram';

@Component({
  selector: 'app-treatment-services',
  standalone: true,
  imports: [Instagram],
  templateUrl: './treatment-services.html',
  styleUrl: './treatment-services.css',
})
export class TreatmentServices implements OnInit, AfterViewInit {
  constructor(private router: Router) {}
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  isVisible = false;
  hideLoader = false;
  videoReady = false;
  contentReady = false;
  startAnimations = false;

  ngOnInit() {
    setTimeout(() => {
      this.hideLoader = true;
      setTimeout(() => {
        this.startAnimations = true;
      }, 100);
    }, 2500);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll('.reveal, .reveal-img, .reveal-img-right, .letter-animate')
      .forEach(el => observer.observe(el));

    setTimeout(() => {
      this.contentReady = true;
      this.checkReady();
    }, 200);
  }

  onVideoReady() {
    const video = this.bgVideo.nativeElement;
    video.play().catch(() => {});
    this.videoReady = true;
    this.checkReady();
  }

  private checkReady() {
    if (this.videoReady && this.contentReady) {
      setTimeout(() => {
        this.hideLoader = true;
      }, 500);
    }
  }

  bookService(serviceName: string) {
    this.router.navigate(['/booking'], { queryParams: { service: serviceName } });
  }
}
