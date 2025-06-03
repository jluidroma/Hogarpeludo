import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { VoluntarioModel } from '../../../shared/models/voluntario.model';
import { VoluntarioService } from '../../../shared/services/voluntario.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/auth-service.service';
import { NotificacionService } from '../../../shared/notificacion.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-list-voluntario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './list-voluntario.component.html',
  styleUrl: './list-voluntario.component.css'
})
export class ListVoluntarioComponent implements OnInit {
  title = 'Nuestros voluntarios';
  voluntarios: Observable<VoluntarioModel[]> | undefined;
  public isAdmin = false;

  idVoluntarioPendiente: string | null = null;

  constructor(
    private voluntarioService: VoluntarioService,
    public authService: AuthService,
    private notiService: NotificacionService
  ) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'admin';
    });

    this.voluntarios = this.voluntarioService.obtenerVoluntarios();

    this.notiService.confirmacion$.subscribe(confirmado => {
      if (confirmado && this.idVoluntarioPendiente) {
        this.eliminarVoluntarioFinal(this.idVoluntarioPendiente);
        this.idVoluntarioPendiente = null;
      }
    });
  }

  eliminarVoluntario(id: string) {
    this.idVoluntarioPendiente = id;
    this.notiService.mostrar(
      'warning',
      '¿Está seguro que quiere eliminar este voluntario? Esta acción no se puede deshacer.'
    );
  }

  eliminarVoluntarioFinal(id: string) {
    this.voluntarioService.eliminarVoluntario(id).subscribe({
      next: data => {
        console.log('Voluntario eliminado');
        this.notiService.mostrar(data.type || 'success', data.mensaje || 'Voluntario eliminado correctamente.');
        this.ngOnInit();
      },
      error: err => {
        console.error('Error al eliminar el voluntario:', err);
        this.notiService.mostrar('error', err.error?.mensaje);
      }
    });
  }
}

