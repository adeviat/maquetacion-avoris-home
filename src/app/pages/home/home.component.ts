import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/organisms/header/header.component";
import { HeroComponent } from "../../components/organisms/hero/hero.component";
import { FiltersComponent } from '../../components/organisms/filters/filters.component';
import { TripGridComponent } from '../../components/organisms/trip-grid/trip-grid.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    HeroComponent,
    FiltersComponent,
    TripGridComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
