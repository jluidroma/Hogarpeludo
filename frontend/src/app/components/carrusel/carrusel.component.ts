import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive  } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {

}
