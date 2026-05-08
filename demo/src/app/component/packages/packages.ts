import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './packages.html',
  styleUrl: './packages.css',
})
export class Packages implements AfterViewInit, OnInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  hideLoader = true;
  videoReady = false;
  contentReady = false;
  startAnimations = false;

  plans: any[] = [];
  filteredPlans: any[] = [];

  constructor(
    private router: Router,
    private cartService: Cart,
    private routes: ActivatedRoute,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    this.loadPlans();

    this.routes.queryParams.subscribe(params => {
      const search = params['search']?.toLowerCase();
      if (search) {
        this.filterPlans(search);
        setTimeout(() => {
          document.getElementById('servicePricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    });

    this.hideLoader = false;
    setTimeout(() => {
      this.hideLoader = true;
      setTimeout(() => {
        this.startAnimations = true;
      }, 100);
    }, 2000);
  }

  loadPlans() {
    this.planService.getPlans().subscribe(data => {
      this.plans = data;
      // Filter out expired plans immediately
      this.filteredPlans = this.plans.filter(plan => !this.isExpired(plan.duration));

      // 🔥 Re-scan for reveal animations AFTER plans are loaded
      setTimeout(() => {
        this.initAnimations();
      }, 500);
    });
  }

  filterPlans(query: string) {
    this.filteredPlans = this.plans.filter(plan =>
      !this.isExpired(plan.duration) && plan.name.toLowerCase().includes(query)
    );
    // Restart animations for new results
    setTimeout(() => this.initAnimations(), 100);
  }

  isExpired(dateStr: string): boolean {
    if (!dateStr) return false;
    const expiryDate = new Date(dateStr);
    const today = new Date();
    // Reset time for comparison
    today.setHours(0, 0, 0, 0);
    return expiryDate < today;
  }

  ngAfterViewInit(): void {
    this.initAnimations();
    setTimeout(() => {
      this.contentReady = true;
      this.checkReady();
    }, 2000);
  }

  /** Initialize Scroll Reveal Animations */
  initAnimations() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-img, .reveal-img-right, .letter-animate');
    elements.forEach(el => observer.observe(el));
  }

  isBooked(serviceName: string): boolean {
    return this.cartService.isInCart(serviceName);
  }

  addToCart(plan: any) {
    this.cartService.addToCart({
      name: plan.name,
      price: plan.discount ? (plan.price - (plan.price * plan.discount / 100)) : plan.price,
      desc: plan.description,
      imageUrl: plan.imageUrl
    });
  }

  onVideoReady() {
    const video = this.bgVideo.nativeElement;
    video.play().catch(() => { });
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
    this.router.navigate(['/booking'], {
      queryParams: { service: serviceName }
    });
  }
}
