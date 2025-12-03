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
  trips: Trip[] = [
    {
      id: 1,
      region: 'Asia',
      country: 'Tailandia, Asia',
      days: 9,
      title: 'Descubre Bangkok con Iberojet',
      priceFrom: 248,
      tag: 'Quads',
      image: 'https://picsum.photos/600/400?random=11',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['quads']
      },
    {
      id: 2,
      region: 'Africa',
      country: 'Marruecos, África',
      days: 5,
      title: 'Aventura en el desierto',
      priceFrom: 248,
      tag: 'Parapente',
      image: 'https://picsum.photos/600/400?random=12',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['parapente']
    },
    {
      id: 3,
      region: 'Africa',
      country: 'Marruecos, África',
      days: 6,
      title: 'Ruta costera inolvidable',
      priceFrom: 248,
      tag: 'Explora',
      image: 'https://picsum.photos/600/400?random=13',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['explora'],
    },
    {
      id: 4,
      region: 'Europa',
      country: 'España, Europa',
      days: 7,
      title: 'Ciudades milenarias',
      priceFrom: 248,
      tag: 'Quads',
      image: 'https://picsum.photos/600/400?random=14',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['quads'],
    },
    {
      id: 5,
      region: 'Asia',
      country: 'Tailandia, Asia',
      days: 9,
      title: 'Sabores de Bangkok',
      priceFrom: 248,
      tag: 'Parapente',
      image: 'https://picsum.photos/600/400?random=15',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['parapente'],
    },
    {
      id: 6,
      region: 'América',
      country: 'Perú, América',
      days: 8,
      title: 'Templos y naturaleza',
      priceFrom: 248,
      tag: 'Explora',
      image: 'https://picsum.photos/600/400?random=16',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['explora'],
    },
    {
      id: 7,
      region: 'América',
      country: 'Colombia, América',
      days: 5,
      title: 'Playas escondidas',
      priceFrom: 248,
      tag: 'Quads',
      image: 'https://picsum.photos/600/400?random=17',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['quads'],
    },
    {
      id: 8,
      region: 'Africa',
      country: 'Marruecos, África',
      days: 9,
      title: 'Ruta panorámica',
      priceFrom: 248,
      tag: 'Parapente',
      image: 'https://picsum.photos/600/400?random=18',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['parapente'],
    },
    {
      id: 9,
      region: 'Oceanía',
      country: 'Australia, Oceanía',
      days: 3,
      title: 'Mar extremo',
      priceFrom: 248,
      tag: 'Surf',
      image: 'https://picsum.photos/600/400?random=19',
      breakdown: [
        { label: 'Precio antes de impuestos', amount: 1124 },
        { label: 'Impuesto', amount: 4.43 },
        { label: 'Lorem ipsum', amount: 150.42 },
      ],
      finalPrice: 2455,
      activities: ['surf'],
    },
  ];

  filtersOpen = false;

  selectedActivities = new Set<string>(['explora', 'parapente']);

  get filteredTrips(): Trip[] {
    if (this.selectedActivities.size === 0) {
      return this.trips;
    }

    return this.trips.filter((trip) =>
      trip.activities.some((a) => this.selectedActivities.has(a))
    );
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
}