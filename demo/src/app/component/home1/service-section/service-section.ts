import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-service-section',
  imports: [],
  templateUrl: './service-section.html',
  styleUrl: './service-section.css',
})
export class ServiceSection implements AfterViewInit {


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
}


  
}
