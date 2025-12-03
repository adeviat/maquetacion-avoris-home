import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export interface TripBreakdownItem {
  label: string;
  amount: number;
}

export interface Trip {
  id: number;
  region: string;
  country: string;
  days: number;
  title: string;
  priceFrom: number;
  tag: string;
  image: string;
  breakdown: TripBreakdownItem[];
  finalPrice: number;
  activities: string[];
}

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;

  showBreakdown = false;

  openBreakdown(): void {
    this.showBreakdown = true;
  }

  closeBreakdown(): void {
    this.showBreakdown = false;
  }
}