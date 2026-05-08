import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class ReportsComponent implements OnInit {
  reportStats = [
    { label: 'Total Sales', value: '₹12,45,000', period: 'This Month', change: '+15.2%', positive: true },
    { label: 'Average Booking Value', value: '₹1,500', period: 'This Month', change: '-2.4%', positive: false },
    { label: 'Growth Rate', value: '24%', period: 'This Year', change: '+4.1%', positive: true }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getDashboardStats().subscribe(data => {
      this.reportStats[0].value = '₹' + data.revenue;
    });
  }

  exportReport(type: string) {
    alert(`Exporting report as ${type}...`);
  }
}
