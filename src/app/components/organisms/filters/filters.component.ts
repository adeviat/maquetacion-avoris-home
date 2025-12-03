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
}