import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/organisms/header/header.component';
import { HeroComponent } from '../../components/organisms/hero/hero.component';
import { TripGridComponent } from '../../components/organisms/trip-grid/trip-grid.component';
import { FooterComponent } from '../../components/organisms/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    TripGridComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}