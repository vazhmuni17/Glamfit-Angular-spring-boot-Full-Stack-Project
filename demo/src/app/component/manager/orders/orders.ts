import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  currentFilter: string = 'ALL';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.adminService.getBookings().subscribe(data => {
      this.orders = data.map(b => ({
        ...b,
        customer: b.firstName + ' ' + b.lastName,
        time: b.appointmentTime
      }));
    });
  }

  get filteredOrders() {
    if (this.currentFilter === 'ALL') {
      return this.orders;
    }
    return this.orders.filter(order => order.status?.toUpperCase() === this.currentFilter);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  updateStatus(order: any, newStatus: string) {
    this.adminService.updateBookingStatus(order.id, newStatus).subscribe(() => {
      order.status = newStatus;
    });
  }
}
