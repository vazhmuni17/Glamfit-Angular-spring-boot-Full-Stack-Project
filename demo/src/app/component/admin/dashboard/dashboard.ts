import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  stats: any[] = [];
  recentBookings: any[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminService.getDashboardStats().subscribe(data => {
      this.stats = [
        { label: 'Total Users', value: data.totalUsers, icon: 'users', color: 'bg-blue-500', trend: '+12%' },
        { label: 'Total Bookings', value: data.totalOrders, icon: 'calendar', color: 'bg-green-500', trend: '+5%' },
        { label: 'Revenue', value: '₹' + data.revenue, icon: 'currency-rupee', color: 'bg-amber-500', trend: '+18%' },
        { label: 'System Healthy', value: '100%', icon: 'star', color: 'bg-purple-500', trend: 'OK' }
      ];
    });

    this.adminService.getBookings().subscribe(bookings => {
      this.recentBookings = bookings.slice(0, 5).map(b => ({
        id: '#BK-' + b.id,
        customer: b.firstName + ' ' + b.lastName,
        service: b.service,
        date: b.appointmentDate,
        status: b.status
      }));
    });
  }

  downloadReport() {
    const data = {
      stats: this.stats,
      bookings: this.recentBookings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Glamfit_Report_${new Date().toLocaleDateString()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  addPlan() {
    this.router.navigate(['/admin/products']);
  }

  addUser() {
    this.router.navigate(['/admin/users']);
  }

  viewReport() {
    this.router.navigate(['/admin/reports']);
  }
}
