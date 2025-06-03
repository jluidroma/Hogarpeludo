import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NotificacionService } from './shared/notificacion.service';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CommonModule } from '@angular/common';

// Define aquí si no tienes un archivo aparte:
type TipoNotificacion = 'success' | 'error' | 'warning' | 'info';
interface Notificacion {
  tipo: TipoNotificacion;
  mensaje: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CarruselComponent,
    RegistroComponent,
    NotificacionComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  notificacion: Notificacion | null = null;

  constructor(private notiService: NotificacionService) {
  this.notiService.notificacion$.subscribe(noti => {
  if (noti && ['success', 'error', 'warning', 'info'].includes(noti.tipo)) {
    this.notificacion = noti as Notificacion;
  } else if (noti === null) {
    this.notificacion = null;
  } else {
    console.warn('Tipo de notificación no válido:', noti?.tipo);
  }
});

  }

  cerrarNoti() {
    this.notificacion = null;
  }
}
