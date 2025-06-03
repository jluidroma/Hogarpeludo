import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../../../shared/models/mascota.model';
import { MascotaService } from '../../../shared/services/mascota.service';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth-service.service';
import { NotificacionService } from '../../../shared/notificacion.service';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-list-mascotas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './list-mascotas.component.html',
  styleUrls: ['./list-mascotas.component.css']
})
export class ListMascotasComponent implements OnInit {
  title = 'Mascotas en adopción';
  mascotas: Observable<(MascotaModel & { sanitizedImagen?: SafeUrl; imageError?: boolean })[]> | undefined;
  idMascotaPendiente: string | null = null;

  constructor(
    private mascotaService: MascotaService,
    public authService: AuthService,
    private notiService: NotificacionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Cargar mascotas desde la base de datos y sanitizar URLs
    this.mascotas = this.mascotaService.obtenerMascotas().pipe(
      map(mascotas =>
        mascotas.map(mascota => ({
          ...mascota,
          sanitizedImagen: mascota.imagen ? this.sanitizer.bypassSecurityTrustUrl(mascota.imagen) : undefined,
          imageError: false
        }))
      )
    );

    // Escuchar confirmación desde la notificación
    this.notiService.confirmacion$.subscribe(confirmado => {
      if (confirmado && this.idMascotaPendiente) {
        this.eliminarMascotaFinal(this.idMascotaPendiente);
        this.idMascotaPendiente = null;
      }
    });
  }

  onImageError(mascota: MascotaModel & { sanitizedImagen?: SafeUrl; imageError?: boolean }) {
    mascota.imageError = true;
    mascota.sanitizedImagen = undefined; // Fallback to placeholder
    this.notiService.mostrar('error', `No se pudo cargar la imagen de ${mascota.nombre}`);
    // Trigger change detection by re-emitting mascotas
    this.mascotas = this.mascotaService.obtenerMascotas().pipe(
      map(mascotas =>
        mascotas.map(m => ({
          ...m,
          sanitizedImagen: m.imagen ? this.sanitizer.bypassSecurityTrustUrl(m.imagen) : undefined,
          imageError: m.id === mascota.id ? true : false
        }))
      )
    );
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
        this.notiService.mostrar('error', 'Error al eliminar la mascota');
      }
    });
  }
}