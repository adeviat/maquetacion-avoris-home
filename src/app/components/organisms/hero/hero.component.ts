import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaLabel: string;
  image: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgFor],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  slides: HeroSlide[] = [
    {
      id: 1,
      title: 'Ruta por Australia',
      subtitle: 'Si te va la aventura, no te lo puedes perder',
      ctaLabel: 'Más información',
      image: 'https://picsum.photos/1100/400?random=1',
    },
    {
      id: 2,
      title: 'Escapada a Marruecos',
      subtitle: 'Descubre el desierto y sus contrastes',
      ctaLabel: 'Ver detalles',
      image: 'https://picsum.photos/1100/400?random=2',
    },
    {
      id: 3,
      title: 'Costa Amalfitana',
      subtitle: 'Carretera junto al mar y pueblos de cuento',
      ctaLabel: 'Explorar viaje',
      image: 'https://picsum.photos/1100/400?random=3',
    },
  ];

  activeIndex = 0;

  get activeSlide(): HeroSlide {
    return this.slides[this.activeIndex];
  }

  goTo(index: number): void {
    if (index < 0) {
      this.activeIndex = this.slides.length - 1;
    } else if (index >= this.slides.length) {
      this.activeIndex = 0;
    } else {
      this.activeIndex = index;
    }
  }

  prev(): void {
    this.goTo(this.activeIndex - 1);
  }

  next(): void {
    this.goTo(this.activeIndex + 1);
  }
}