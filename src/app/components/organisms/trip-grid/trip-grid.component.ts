import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TripCardComponent, Trip } from '../../molecules/trip-card/trip-card.component';
import { FiltersComponent } from '../../organisms/filters/filters.component';

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
export class TripGridComponent {
  selectedActivities = new Set<string>();
  selectedDestinations = new Set<string>();
  priceRange: { min: number | null; max: number | null } = { min: null, max: null };
  filtersOpen = false;

  trips: Trip[] = [
    {
      id: 1,
      region: 'Asia',
      country: 'Tailandia, Asia',
      days: 9,
      title: 'Descubre Bangkok con Iberojet',
      priceFrom: 248,
      price: 248,
      tag: 'Quads',
      image: 'https://picsum.photos/600/400?random=11',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 300,
      activities: ['quads']
      },
    {
      id: 2,
      region: 'Africa',
      country: 'Marruecos, África',
      days: 5,
      title: 'Aventura en el desierto',
      priceFrom: 270,
      price: 270,
      tag: 'Parapente',
      image: 'https://picsum.photos/600/400?random=12',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 320,
      activities: ['parapente']
    },
    {
      id: 3,
      region: 'Africa',
      country: 'Marruecos, África',
      days: 6,
      title: 'Ruta costera inolvidable',
      priceFrom: 300,
      price: 300,
      tag: 'Explora',
      image: 'https://picsum.photos/600/400?random=13',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 1200,
      activities: ['explora'],
    },
    {
      id: 4,
      region: 'Europa',
      country: 'España, Europa',
      days: 7,
      title: 'Ciudades milenarias',
      priceFrom: 150,
      price: 150,
      tag: 'Quads',
      image: 'https://picsum.photos/600/400?random=14',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 195,
      activities: ['quads'],
    },
    {
      id: 5,
      region: 'Asia',
      country: 'Tailandia, Asia',
      days: 9,
      title: 'Sabores de Bangkok',
      priceFrom: 549,
      price: 549,
      tag: 'Parapente',
      image: 'https://picsum.photos/600/400?random=15',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 700,
      activities: ['parapente'],
    },
    {
      id: 6,
      region: 'América',
      country: 'Perú, América',
      days: 8,
      title: 'Templos y naturaleza',
      priceFrom: 148,
      price: 148,
      tag: 'Explora',
      image: 'https://picsum.photos/600/400?random=16',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 150,
      activities: ['explora'],
    },
    {
      id: 7,
      region: 'América',
      country: 'Colombia, América',
      days: 5,
      title: 'Playas escondidas',
      priceFrom: 248,
      price: 248,
      tag: 'Quads',
      image: 'https://picsum.photos/600/400?random=17',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 260,
      activities: ['quads'],
    },
    {
      id: 8,
      region: 'Africa',
      country: 'Marruecos, África',
      days: 9,
      title: 'Ruta panorámica',
      priceFrom: 268,
      price: 268,
      tag: 'Parapente',
      image: 'https://picsum.photos/600/400?random=18',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 280,
      activities: ['parapente'],
    },
    {
      id: 9,
      region: 'Oceanía',
      country: 'Australia, Oceanía',
      days: 3,
      title: 'Mar extremo',
      priceFrom: 248,
      price: 248,
      tag: 'Surf',
      image: 'https://picsum.photos/600/400?random=19',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 250,
      activities: ['surf'],
    },
  ];

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