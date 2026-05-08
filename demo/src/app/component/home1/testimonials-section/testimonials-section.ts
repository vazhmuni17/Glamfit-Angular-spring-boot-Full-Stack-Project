import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-testimonials-section',
  imports: [],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
})
export class TestimonialsSection implements AfterViewInit {

  @ViewChild('testimonialSection', { static: true })
  section!: ElementRef;

  isVisible = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.disconnect(); // ✅ run only once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(this.section.nativeElement);
  }
}
