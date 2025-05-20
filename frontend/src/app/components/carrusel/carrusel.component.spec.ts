import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarruselComponent {
  currentSlide = 1; // Para rastrear la diapositiva actual (1, 2 o 3)
}