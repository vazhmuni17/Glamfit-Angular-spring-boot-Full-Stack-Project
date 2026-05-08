import { Component } from '@angular/core';
import { BookingForm } from '../booking-form/booking-form';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {

}
