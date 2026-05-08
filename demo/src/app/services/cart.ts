import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart  {

 private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    // ✅ Load cart from localStorage on app start
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCartCount();
    }
  }

  addToCart(service: any) {
    const item = this.cartItems.find(i => i.name === service.name);

    if (item) {
      item.qty++;
      item.totalPrice = item.qty * item.price;
    } else {
      this.cartItems.push({
        ...service,
        qty: 1,
        totalPrice: service.price
      });
    }

    this.saveCart();
  }

  // ✅ REMOVE ITEM
  removeItem(serviceName: string) {
    this.cartItems = this.cartItems.filter(
      item => item.name !== serviceName
    );
    this.saveCart();
  }

  isInCart(serviceName: string): boolean {
    return this.cartItems.some(item => item.name === serviceName);
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotal() {
    return this.cartItems.reduce((sum, i) => sum + i.totalPrice, 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

  private updateCartCount() {
    const totalQty = this.cartItems.reduce(
      (sum, item) => sum + item.qty, 0
    );
    this.cartCount.next(totalQty);
  }
}
