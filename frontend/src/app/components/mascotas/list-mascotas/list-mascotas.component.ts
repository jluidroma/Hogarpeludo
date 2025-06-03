import { Component } from '@angular/core';
import { MascotaModel } from '../../../shared/models/mascota.model';
import { MascotaService } from '../../../shared/services/mascota.service';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth-service.service';
import { NotificacionService } from '../../../shared/notificacion.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-list-mascotas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './list-mascotas.component.html',
  styleUrl: './list-mascotas.component.css'
})
export class ListMascotasComponent implements OnInit {
  title = 'Mascotas en adopción';
  mascotas: Observable<MascotaModel[]> | undefined;
  idMascotaPendiente: string | null = null;

  constructor(
    private mascotaService: MascotaService,
    public authService: AuthService,
    private notiService: NotificacionService
  ) {}

  ngOnInit() {
    // Cargar mascotas desde la base de datos
    this.mascotas = this.mascotaService.obtenerMascotas();

    // Escuchar confirmación desde la notificación
    this.notiService.confirmacion$.subscribe(confirmado => {
      if (confirmado && this.idMascotaPendiente) {
        this.eliminarMascotaFinal(this.idMascotaPendiente);
        this.idMascotaPendiente = null;
      }
    });
  }

  eliminarMascota(idMascota: string) {
    this.idMascotaPendiente = idMascota;
    this.notiService.mostrar(
      'warning',
      '¿Está seguro que quiere eliminar el registro? Sus datos no podrán ser recuperados.'
    );
  }

  eliminarMascotaFinal(idMascota: string) {
    this.mascotaService.eliminarMascota(idMascota).subscribe({
      next: data => {
        console.log('Registro eliminado');
        this.notiService.mostrar(data.type, data.mensaje);
        this.ngOnInit(); // Recargar la lista
      },
      error: err => {
        console.error('Error al eliminar el registro:', err);
      }
    });
  }
}
