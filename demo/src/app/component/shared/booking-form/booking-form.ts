import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.html',
  imports:[FormsModule,CommonModule,ReactiveFormsModule]
})
export class BookingForm implements OnInit{

  isSubmitting = false;
  successMsg = false;

  bookingForm!: FormGroup;

  timeSlots: string[] = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM'
  ];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {
    this.bookingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      service: this.fb.array([]) // multiple services
    });


  }

get serviceArray(): FormArray {
  return this.bookingForm.get('service') as FormArray;
}

  // Handles checkbox select / unselect
 onServiceChange(event: any) {
  const value = event.target.value;
  const checked = event.target.checked;

  const services = this.serviceArray.value as string[];

  if (checked && !services.includes(value)) {
    this.serviceArray.push(this.fb.control(value));
  }

  if (!checked) {
    const index = services.indexOf(value);
    if (index !== -1) {
      this.serviceArray.removeAt(index);
    }
  }

  // prevent validation side effects
  this.serviceArray.markAsUntouched();
}

  // 🔴 IMPORTANT FIX: array → string
  private preparePayload(data: any) {
    return {
      ...data,
      service: data.service.join(', ') // convert to String
    };

    
  }

 submitForm() {
  
  if (this.bookingForm.invalid) {
    this.bookingForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  this.successMsg = false;

  const payload = this.preparePayload(this.bookingForm.value);

  this.appointmentService.bookAppointment(payload)
    .pipe(
      finalize(() => {
        // ✅ ALWAYS stop loader (success or error)
        this.isSubmitting = false;
      })
    )
    .subscribe({
      next: () => {
        // ✅ show success message
        this.successMsg = true;

        // reset form safely
        this.bookingForm.reset();
        this.serviceArray.clear();

        // ✅ auto-hide success message
        setTimeout(() => {
          this.successMsg = false;
        }, 4000);
      },
      error: () => {
        alert('Failed to book appointment. Please try again.');
      }
    });
}


ngOnInit(): void {
  this.loadServicesFromCart();
  this.route.queryParams.subscribe(params => {
    const service = params['service'];
    if (service) {
      // Clear cart-loaded services and use the clicked service
      this.serviceArray.clear();
      this.serviceArray.push(this.fb.control(service));
    }
  });
}

loadServicesFromCart() {
  const savedCart = localStorage.getItem('cart');

  if (!savedCart) return;

  const cartItems = JSON.parse(savedCart);

  const servicesFromCart = cartItems.map(
    (item: any) => item.name
  );

  this.serviceArray.clear();

  servicesFromCart.forEach((service: string) => {
    this.serviceArray.push(this.fb.control(service));
  });
}



}