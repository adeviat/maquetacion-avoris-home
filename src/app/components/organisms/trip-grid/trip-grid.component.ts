import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { TripCardComponent, Trip } from '../../molecules/trip-card/trip-card.component';
import { FiltersComponent } from '../../organisms/filters/filters.component';
import { TripDataService } from '../../../services/trip-data.service';

type TripSection = {
  region: string;
  trips: Trip[];
};

@Component({
  selector: 'app-trip-grid',
  standalone: true,
  imports: [NgFor, TripCardComponent, FiltersComponent],
  templateUrl: './trip-grid.component.html',
  styleUrls: ['./trip-grid.component.scss'],
})
export class TripGridComponent implements OnInit {
  selectedActivities = new Set<string>();
  selectedDestinations = new Set<string>();
  priceRange: { min: number | null; max: number | null } = { min: null, max: null };
  filtersOpen = false;

  trips: Trip[] = [];

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    // ← NUEVO MÉTODO: carga los datos del servicio
    this.trips = this.tripDataService.getMockTrips();
  }

  get filteredTrips(): Trip[] {
    return this.trips.filter(trip => {
      // Filtro DESTINOS (nuevo)
      const matchesDestinations = this.selectedDestinations.size === 0 || 
        this.selectedDestinations.has(trip.region);
      
      // Filtro actividades
      const matchesActivities = this.selectedActivities.size === 0 || 
        Array.from(this.selectedActivities).some(activity => 
          trip.activities.includes(activity)
        );
      
      // Filtro precio
      const matchesPrice = (!this.priceRange.min || trip.finalPrice >= this.priceRange.min) &&
                          (!this.priceRange.max || trip.finalPrice <= this.priceRange.max);
      
      return matchesDestinations && matchesActivities && matchesPrice;
    });
  }

  get uniqueRegions(): string[] {
    return Array.from(new Set(this.trips.map(trip => trip.region))).sort();
  }

  get sections(): TripSection[] {
    const map = new Map<string, Trip[]>();

    for (const trip of this.filteredTrips) {
      if (!map.has(trip.region)) {
        map.set(trip.region, []);
      }
      map.get(trip.region)!.push(trip);
    }

    return Array.from(map.entries()).map(([region, trips]) => ({
      region,
      trips,
    }));
  }

  openFilters() {
    this.filtersOpen = true;
  }

  closeFilters() {
    this.filtersOpen = false;
  }

  trackByTripId(index: number, trip: Trip): number {
    return trip.id;
  }

  trackBySectionId(index: number, section: TripSection): string {
    return section.region;
  }
}