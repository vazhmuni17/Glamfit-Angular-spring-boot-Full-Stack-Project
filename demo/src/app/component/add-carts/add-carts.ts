import { Component, OnInit } from '@angular/core';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-carts',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-carts.html',
  styleUrl: './add-carts.css',
})
export class AddCarts implements OnInit {

  cartItems: any[] = [];
  grandTotal = 0;

  constructor(private cartService: Cart,

    private router:Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.grandTotal = this.cartService.getTotal();
  }
  removeItem(name: string) {
  this.cartService.removeItem(name);
  this.cartItems = this.cartService.getCartItems();
  this.grandTotal = this.cartService.getTotal();
}
processBooking() {
   
  

  // 3️⃣ Navigate to booking form
  this.router.navigate(['booking']);
}


}