import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgIf],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements AfterViewInit {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() valueActivities = new Set<string>();
  @Output() activitiesChange = new EventEmitter<Set<string>>();

  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.forEach((el) => {
      (window as any).bootstrap?.Tooltip &&
        new (window as any).bootstrap.Tooltip(el);
    });
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
}