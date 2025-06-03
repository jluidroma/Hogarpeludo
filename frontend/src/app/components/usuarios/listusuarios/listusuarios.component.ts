import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth-service.service';
import { NotificacionService } from '../../../shared/notificacion.service';
import { usuarioModel } from '../../../shared/models/usuario.model';
import { UsuarioserviceService } from '../../../shared/services/usuarioservice.service';

@Component({
  selector: 'app-listusuarios',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './listusuarios.component.html',
  styleUrl: './listusuarios.component.css'
})
export class ListusuariosComponent implements OnInit {
  usuarios: Observable<usuarioModel[]> | undefined;
  idUsuarioPendiente: string | null = null;

  constructor(
    private userService: UsuarioserviceService,
    public authService: AuthService,
    private notiService: NotificacionService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    
    this.notiService.confirmacion$.subscribe(confirmado => {
      if (confirmado && this.idUsuarioPendiente) {
        this.eliminarUsuarioFinal(this.idUsuarioPendiente);
        this.idUsuarioPendiente = null;
      }
    });
  }

  cargarUsuarios() {
    this.usuarios = this.userService.obtenerUsuarios();
  }

  eliminarUsuario(id: string) {
    this.idUsuarioPendiente = id;
    this.notiService.mostrar(
      'warning',
      '¿Está seguro que quiere eliminar este usuario? Esta acción no se puede deshacer.'
    );
  }

  eliminarUsuarioFinal(id: string) {
    this.userService.eliminarUsuario(id).subscribe({
      next: data => {
        console.log('Usuario eliminado');
        this.notiService.mostrar(data.type, data.mensaje);
        this.cargarUsuarios(); // Recargar la lista de usuarios
      },
      error: err => {
        this.notiService.mostrar('error', "Error al eliminar el usuario");
      }
    });
  }
}