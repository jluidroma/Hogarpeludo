import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolicitudModel } from '../../../shared/models/solicitud.model';
import { SolicitudService } from '../../../shared/services/solicitud.service';
import { NotificacionService } from '../../../shared/notificacion.service';
import { AuthService } from '../../../shared/auth-service.service';
import { MascotaService } from '../../../shared/services/mascota.service';
import { MascotaModel } from '../../../shared/models/mascota.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { usuarioModel } from '../../../shared/models/usuario.model';
import { UsuarioserviceService } from '../../../shared/services/usuarioservice.service';

@Component({
  selector: 'app-addsolicitud',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './addsolicitud.component.html',
  styleUrl: './addsolicitud.component.css'
})
export class AddsolicitudComponent {
  mascotas: Observable<MascotaModel[]> | undefined;
  opcion: string = 'Nueva Solicitud de Adopción';
  id: string = '';

  solicitud = new SolicitudModel('', '', '', '', 'pendiente', '');
  mascota = new MascotaModel('', '', '', '', '', '', '', '', '');
  usuario = new usuarioModel('', '', '', '', '', '');

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router,
    private notiService: NotificacionService,
    private authService: AuthService,
    private mascotaService: MascotaService,
    private usuarioService: UsuarioserviceService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Obtener datos de la mascota si hay ID
    if (this.id) {
      this.mascotaService.obtenerMascota(this.id).subscribe({
        next: data => {
          this.mascota = data;
          this.solicitud.id_mascota = data.id;
        },
        error: err => {
          console.error('Error al obtener la mascota', err);
        }
      });
    }

    // Obtener datos del usuario logueado
    const token = localStorage.getItem('firebaseToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const uid = decoded.user_id || decoded.sub;
        
        this.usuarioService.obtenerUsuario(uid).subscribe({
          next: (data: usuarioModel) => {
            this.usuario = data;
            this.solicitud.id_solicitante = data.uid;
            this.solicitud.estado = 'pendiente';
            this.solicitud.fecha_solicitud = new Date().toISOString().substring(0, 10);
          },
          error: (err) => {
            console.error('Error al obtener el usuario', err);
          }
        });
      } catch (err) {
        console.error('Error al decodificar el token', err);
      }
    } else {
      console.warn('Token no encontrado en localStorage');
    }

    // Obtener lista de mascotas
    this.mascotas = this.mascotaService.obtenerMascotas();
  }

  onSubmit() {
    console.log("Datos de la solicitud:", this.solicitud);
    this.solicitudService.agregarSolicitud(this.solicitud).subscribe({
      next: data => {
        this.router.navigate(['/solicitudes']);
        this.notiService.mostrar(data.type, data.mensaje);
      },
      error: err => {
        console.error('Error al agregar solicitud:', err);
        this.notiService.mostrar('error', 'Error al enviar la solicitud');
      }
    });
  }
}