import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Instagram } from '../shared/instagram/instagram';
import { BookingForm } from '../shared/booking-form/booking-form';

@Component({
  selector: 'app-contactus',
  imports: [Instagram,BookingForm],
  templateUrl: './contactus.html',
  styleUrl: './contactus.css',
})
export class Contactus implements AfterViewInit {

@ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('revealSection', { static: true })
  revealSection!: ElementRef;

  isVisible = false;

 ngAfterViewInit(): void {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal, .reveal-img, .reveal-img-right, .reveal-scale')
    .forEach(el => observer.observe(el));
     setTimeout(() => {
      this.contentReady = true;
      this.checkReady();
    }, 200);
}
hideLoader = true;        // START hidden
  videoReady = false;
  contentReady = false;
  startAnimations = false; 

  
ngOnInit() {
    // 🔥 FORCE loader to show on every page visit
    this.hideLoader = false;
    this.videoReady = false;
    this.contentReady = false;
    this.startAnimations = false;
     setTimeout(() => {
      this.hideLoader = true;

      // ⏱ Start text animation AFTER loader is gone
      setTimeout(() => {
        this.startAnimations = true;
      }, 100); // small delay = smoother
    }, 2500);
  
    
  }
  
  onVideoReady() {
    const video = this.bgVideo.nativeElement;

    // Force play for hosting browsers
    video.play().catch(() => {});

    this.videoReady = true;
    this.checkReady();
  }

  private checkReady() {
    if (this.videoReady && this.contentReady) {
      setTimeout(() => {
        this.hideLoader = true; // 🔥 DESTROY loader
      }, 500);
    }
  }
}

