import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent {
  showBreakdown = false;
  openBreakdown() { this.showBreakdown = true; }
  closeBreakdown() { this.showBreakdown = false; }
}