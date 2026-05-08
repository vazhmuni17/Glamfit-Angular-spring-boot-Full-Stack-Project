import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServiceSection } from '../home1/service-section/service-section';

import { Instagram } from '../shared/instagram/instagram';
import { SocialMedia } from '../shared/social-media/social-media';

@Component({
  selector: 'app-services',
  imports: [Instagram],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements AfterViewInit {
 @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  @ViewChild('revealSection', { static: true })
  revealSection!: ElementRef;

  isVisible = false;
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

  scrollToAppointment() {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
    

}
