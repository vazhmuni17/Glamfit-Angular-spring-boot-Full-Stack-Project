import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Instagram } from '../shared/instagram/instagram';
import { ServiceSection } from '../home1/service-section/service-section';
import { TreatmentSection } from '../home1/treatment-section/treatment-section';
import { TestimonialsSection } from '../home1/testimonials-section/testimonials-section';
import { VideoSection } from '../home1/video-section/video-section';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ServiceSection, TreatmentSection, TestimonialsSection, VideoSection, Instagram],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  constructor(private router: Router) { }
  
  hideLoader = false;
  images = [
    
    './assets/home-slide/home1.jpg',
    './assets/home-slide/home2.jpg',
    './assets/home-slide/home3.jpeg',
    './assets/home-slide/home4.jpg'
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
     this.preloadImages(this.images).then(() => {
      // 🔥 destroy loader AFTER images ready
      setTimeout(() => {
        this.hideLoader = true;
        this.startSlider();
      }, 300); // smooth UX
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  bookingPage(){
    this.router.navigate(['/booking']);
  }
  viewService(){
    this.router.navigate(['/services']);
  }

  
preloadImages(images: string[]): Promise<void> {
    return new Promise((resolve) => {
      let loaded = 0;

      images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === images.length) {
            resolve();
          }
        };
      });
    });
  }

  /** Slider autoplay */
  startSlider() {
    setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    }, 5000);
  }
    
}
