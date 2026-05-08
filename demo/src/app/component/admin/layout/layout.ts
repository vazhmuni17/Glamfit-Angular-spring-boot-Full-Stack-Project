import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {
  isSidebarOpen = true;

  constructor(private authService: AuthService, private router: Router) { }

  get adminName(): string {
    return localStorage.getItem('adminName') || 'Admin User';
  }

  get adminAvatar(): string {
    const name = this.adminName;
    return name.charAt(0).toUpperCase() + (name.split(' ')[1]?.charAt(0).toUpperCase() || '');
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
