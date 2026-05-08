import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { SideMenu } from '../shared/side-menu/side-menu';
import { Cart } from '../../services/cart';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, SideMenu, FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  activeFragment: string | null = null;

  constructor(
    private cartService: Cart,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  isMenuScrolled = false;
  isSideBarShowing = false;

  @HostListener('window:scroll', [])
  scrollCheck() {
    if (window.pageYOffset > 107) {
      this.isMenuScrolled = true;
    } else {
      this.isMenuScrolled = false;
    }
  }

  openSideBar() {
    this.isSideBarShowing = true;
  }

  closeSideBar() {
    this.isSideBarShowing = false;
  }

  cartCount = 0;
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Track fragments for highlighting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      if (url.includes('#')) {
        this.activeFragment = url.split('#')[1];
      } else {
        this.activeFragment = null;
      }
    });
  }

  isSearchOpen = false;

  openSearch() {
    this.isSearchOpen = true;
    document.body.classList.add('overflow-hidden');
  }

  closeSearch() {
    this.isSearchOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  searchQuery = '';
  goToSearch() {
    if (!this.searchQuery.trim()) return;
    this.closeSearch();
    this.router.navigate(['/packages'], {
      queryParams: { search: this.searchQuery }
    });
    this.searchQuery = '';
  }
}