import { Component } from '@angular/core';
import { TripCardComponent } from '../../molecules/trip-card/trip-card.component';

@Component({
  selector: 'app-trip-grid',
  standalone: true,
  imports: [TripCardComponent],
  templateUrl: './trip-grid.component.html',
  styleUrls: ['./trip-grid.component.scss'],
})
export class TripGridComponent {}