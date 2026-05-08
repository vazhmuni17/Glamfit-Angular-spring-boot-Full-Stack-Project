import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-treatment-section',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './treatment-section.html',
  styleUrl: './treatment-section.css',
})
export class TreatmentSection implements AfterViewInit {
   
@ViewChild('revealSection', { static: true })
  revealSection!: ElementRef;

  isVisible = false;


  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = this.el.nativeElement.querySelectorAll('.letter-animate, .reveal, .reveal-img, .reveal-img-right, .reveal-scale');
    elements.forEach((el: Element) => observer.observe(el));



  
  }
}