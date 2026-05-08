import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit {
  plans: any[] = [];
  isEditing = false;
  currentPlan: any = {
    name: '',
    price: 0,
    discount: 0,
    duration: '',
    description: '',
    imageUrl: ''
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    this.adminService.getPlans().subscribe(data => {
      this.plans = data;
    });
  }

  editPlan(plan: any) {
    this.currentPlan = { ...plan };
    if (!this.currentPlan.discount) this.currentPlan.discount = 0;
    this.isEditing = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentPlan.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  get calculateFinalPrice(): number {
    const price = Number(this.currentPlan.price) || 0;
    const discount = Number(this.currentPlan.discount) || 0;
    return price - (price * discount / 100);
  }

  savePlan() {
    // Ensure numeric values
    this.currentPlan.price = Number(this.currentPlan.price);
    this.currentPlan.discount = Number(this.currentPlan.discount);
    
    this.adminService.savePlan(this.currentPlan).subscribe({
      next: () => {
        this.loadPlans();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Save plan failed:', err);
        alert('Permission Denied (403). Please logout and login again.');
      }
    });
  }

  deletePlan(id: number) {
    if (confirm('Delete this plan?')) {
      this.adminService.deletePlan(id).subscribe(() => {
        this.loadPlans();
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.currentPlan = {
      name: '',
      price: 0,
      discount: 0,
      duration: '',
      description: '',
      imageUrl: ''
    };
  }
}
