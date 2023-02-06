import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-booking',
  standalone: true,
  imports: [RouterLinkWithHref, RouterOutlet],
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss'],
})
export class FlightBookingComponent {}
