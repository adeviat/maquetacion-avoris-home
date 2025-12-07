import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements AfterViewInit, OnChanges {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() valueActivities = new Set<string>();
  @Output() activitiesChange = new EventEmitter<Set<string>>();

  @Input() valuePriceRange: { min: number | null; max: number | null } = { min: null, max: null };
  @Output() priceRangeChange = new EventEmitter<{ min: number | null; max: number | null }>();

  @Input() valueDestinations = new Set<string>();
  @Output() destinationsChange = new EventEmitter<Set<string>>();

  @Input() valueAccommodations = new Set<string>();        // ← NUEVO
  @Output() accommodationsChange = new EventEmitter<Set<string>>(); // ← NUEVO

  @Input() uniqueDestinations: string[] = [];
  @Input() uniqueAccommodations: string[] = [];            // ← NUEVO

  get totalDestinations(): number {
    return this.valueActivities.size + this.valueDestinations.size;
  }

  tempMinPrice: number | null = null;
  tempMaxPrice: number | null = null;

  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((el) => {
      (window as any).bootstrap?.Tooltip &&
        new (window as any).bootstrap.Tooltip(el);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valuePriceRange']) {
      this.tempMinPrice = this.valuePriceRange.min ?? null;
      this.tempMaxPrice = this.valuePriceRange.max ?? null;
    }
  }

  close() {
    this.isOpenChange.emit(false);
  }

  onActivityChange(activity: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    this.onActivityToggle(activity, checked);
  }

  private onActivityToggle(activity: string, checked: boolean) {
    const current = new Set(this.valueActivities);
    if (checked) {
      current.add(activity);
    } else {
      current.delete(activity);
    }
    this.valueActivities = current;
    this.activitiesChange.emit(current);
  }

  onDestinationChange(destination: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    const current = new Set(this.valueDestinations);
    if (checked) {
      current.add(destination);
    } else {
      current.delete(destination);
    }
    this.valueDestinations = current;
    this.destinationsChange.emit(current);
  }

  onAccommodationChange(accommodation: string, event: Event) {  // ← NUEVO
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    const current = new Set(this.valueAccommodations);
    if (checked) {
      current.add(accommodation);
    } else {
      current.delete(accommodation);
    }
    this.valueAccommodations = current;
    this.accommodationsChange.emit(current);
  }

  onMinPriceChange(value: number | null) {
    const newRange = { 
      ...this.valuePriceRange, 
      min: value 
    };
    this.valuePriceRange = newRange;
    this.priceRangeChange.emit(newRange);
  }

  onMaxPriceChange(value: number | null) {
    const newRange = { 
      ...this.valuePriceRange, 
      max: value 
    };
    this.valuePriceRange = newRange;
    this.priceRangeChange.emit(newRange);
  }

  capitalize(str: string): string {  // ← NUEVO
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}