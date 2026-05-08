import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Instagram } from '../shared/instagram/instagram';
import { GalleryService, GalleryItem, ShowcaseHighlight } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, FormsModule, Instagram],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements AfterViewInit, OnInit, OnDestroy {

  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  @ViewChild('counterSection') counterSection!: ElementRef;
  @ViewChild('revealSection', { static: true })
  revealSection!: ElementRef;
  private hasAnimated = false;
  isVisible = false;
  galleryItems: any[] = [];
  carouselItems: any[] = [];
  carouselIndex = 0;
  private carouselInterval: any;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.loadGallery();
    // 🔥 FORCE loader to show on every page visit
    this.hideLoader = false;
    this.contentReady = false;
    this.startAnimations = false;
    setTimeout(() => {
      this.hideLoader = true;

      // ⏱ Start text animation AFTER loader is gone
      setTimeout(() => {
        this.startAnimations = true;
      }, 100); // small delay = smoother
    }, 800);
  }

  loadGallery() {
    // Gallery Grid: Our Artistry & Moments (now fetched from Highlights API, which stores before/after)
    this.galleryService.getHighlights().subscribe(highlights => {
      // Filter out invalid items just in case
      const validItems = highlights?.filter(item => item.beforeImage && item.afterImage) || [];
      
      if (validItems.length > 0) {
        // Map the ShowcaseHighlight objects safely into the grid variables
        this.galleryItems = validItems as any;
      } else {
        this.galleryItems = [
          { type: 'MOMENT', image: 'assets/gallery/client-consultation.jpg', title: 'Client Consultation', description: 'Personalized beauty consultation.' } as any,
          { type: 'MOMENT', image: 'assets/gallery/celebration.jpg', title: 'Festive Celebration', description: 'A joyful moment with our GlamFit family celebrating.' } as any,
          { type: 'MOMENT', image: 'assets/gallery/team-award-ceremony.jpg', title: 'GlamFit Award-Winning Team', description: 'A proud moment as our talented team receives recognition for excellence' } as any,
          { type: 'MOMENT', image: 'assets/gallery/workshop-certificates.jpg', title: 'Workshop Certificates', description: 'Certificates awarded to participants for successfully completing beauty' } as any,
          { type: 'MOMENT', image: 'assets/gallery/facial-treatment.jpg', title: 'Advanced Facial Treatment', description: 'Our beauty experts performing a professional facial treatment' } as any
        ];
      }
      setTimeout(() => this.observeElements(), 200);
    });

    // Carousel: Showcase Highlights (now fetched from standard single-image Gallery API)
    this.galleryService.getAll().subscribe(items => {
      if (items && items.length > 0) {
        this.carouselItems = [...items].reverse().slice(0, 6) as any;
      } else {
        this.carouselItems = [
          {
            beforeImage: 'assets/gallery/hair-smoothing.png',
            title: 'Hair Smoothing Workshop',
            description: 'Professional smoothing techniques with expert trainers.'
          } as any,
          {
            beforeImage: 'assets/gallery/hair-training-session.jpg',
            title: 'Live Hair Training',
            description: 'Hands-on training by certified professionals.'
          } as any
        ];
      }
      this.startCarouselAutoPlay();
    });
  }

  startCarouselAutoPlay() {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    this.carouselInterval = setInterval(() => {
      this.nextCarousel();
    }, 4000);
  }

  nextCarousel() {
    if (this.carouselItems.length === 0) return;
    this.carouselIndex = (this.carouselIndex + 1) % this.carouselItems.length;
  }

  prevCarousel() {
    if (this.carouselItems.length === 0) return;
    this.carouselIndex = (this.carouselIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  setCarouselIndex(idx: number) {
    this.carouselIndex = idx;
    this.startCarouselAutoPlay(); // Reset timer
  }

  ngOnDestroy() {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
  }

  ngAfterViewInit(): void {
    this.observeElements();

    setTimeout(() => {
      this.contentReady = true;
    }, 200);

    const observers = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.startCounters();
        }
      },
      { threshold: 0.4 } // 40% visible
    );

    observers.observe(this.counterSection.nativeElement);
  }

  private observeElements(): void {
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
  }

  private startCounters(): void {
    this.counters.forEach(counter => {
      this.animate(counter.nativeElement);
    });
  }

  private animate(element: HTMLElement): void {
    const target = Number(element.getAttribute('data-target'));
    const duration = 2000; // slower animation
    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      element.innerText = value.toString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.innerText = target.toString();
      }
    };

    requestAnimationFrame(update);
  }

  courses = [
    {
      title: 'Beauty Therapy Course',

      image: 'assets/home-carts/beauty.jpg',

      levelColor: 'bg-[#7C6EE6]',
      rating: 4.9,
      stars: '★★★★★',


      description: 'Complete training in skin care, facials, body treatments & spa therapies.'
    },
    {
      title: 'Professional Makeup Indistries Course',
      price: 24999,
      image: 'assets/home-carts/makeup.jpg',
      level: 'Popular',
      levelColor: 'bg-pink-500',
      rating: 5.0,
      stars: '★★★★★',
      duration: '2 Months',
      students: 70,
      description: 'Bridal, party, HD makeup with professional tools & techniques.'
    },
    {
      title: 'Nail Extensions Course',
      price: 17999,
      image: 'assets/home-carts/nail-care.jpg',
      level: 'Trending',
      levelColor: 'bg-green-500',
      rating: 4.7,
      stars: '★★★★☆',
      duration: '1 Month',
      students: 60,
      description: 'Gel, acrylic, nail art designs & professional nail extension methods.'
    },
    {
      title: 'Mehndi Art Course',
      price: 9999,
      image: 'assets/academy/mehndi.jpg',
      level: 'Short Term',
      levelColor: 'bg-orange-500',
      rating: 4.8,
      stars: '★★★★★',
      duration: '15 Days',
      students: 50,
      description: 'Traditional & bridal mehndi designs with practice sessions.'
    },
    {
      title: 'Aesthetic Course',
      price: 39999,
      image: 'assets/home-carts/asthetic.jpg',
      level: 'Advanced',
      levelColor: 'bg-red-500',
      rating: 5.0,
      stars: '★★★★★',
      duration: '4 Months',
      students: 40,
      description: 'Advanced skin treatments, machines & clinical aesthetics.'
    },
    {
      title: 'Saree Draping Course',
      price: 5999,
      image: 'assets/academy/saree.jpg',
      level: 'Workshop',
      levelColor: 'bg-indigo-500',
      rating: 4.6,
      stars: '★★★★☆',
      duration: '5 Days',
      students: 45,
      description: 'Professional saree draping styles for bridal & events.'
    },
    {
      title: 'PMU (Permanent Makeup)',
      price: 49999,
      image: 'assets/academy/pmu.jpg',
      level: 'Advanced',
      levelColor: 'bg-purple-600',
      rating: 5.0,
      stars: '★★★★★',
      duration: '3 Months',
      students: 25,
      description: 'Microblading, lip blush, eyebrow & PMU techniques.'
    },
    {
      title: 'Eye Lash Extensions Course',
      price: 14999,
      image: 'assets/academy/eyelash.jpg',
      level: 'Trending',
      levelColor: 'bg-teal-500',
      rating: 4.7,
      stars: '★★★★☆',
      duration: '20 Days',
      students: 35,
      description: 'Classic, volume & hybrid eyelash extension techniques.'
    }
  ];

  hideLoader = true;        // START hidden
  contentReady = false;
  startAnimations = false;


}