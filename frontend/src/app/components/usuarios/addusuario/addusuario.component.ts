import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { usuarioModel } from '../../../shared/models/usuario.model';
import { UsuarioserviceService } from '../../../shared/services/usuarioservice.service';
import { NotificacionService } from '../../../shared/notificacion.service';

@Component({
  selector: 'app-addusuario',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './addusuario.component.html',
  styleUrl: './addusuario.component.css'
})
export class AddusuarioComponent {
  opcion: string = '';
  id: string = '';
usuario: usuarioModel = new usuarioModel('', '', '', '', '', '');


  btnEnvEdit = {
    mensaje: '',
    class: '',
    icon: ''
  };

  constructor(
    private usuarioService: UsuarioserviceService,
    private route: ActivatedRoute,
    private router: Router,
    public notiService: NotificacionService
  ) {}
  cancelar(){
     this.router.navigate(['/usuarios']);
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      // Editar usuario
      this.opcion = 'Editar Usuario';
      this.btnEnvEdit = {
        mensaje: 'Actualizar usuario',
        class: 'btn btn-primary flex-grow-1 me-2 hover-btn',
        icon: 'bi bi-pencil-square'
      };

      this.usuarioService.obtenerUsuario(this.id).subscribe({
        next: data => {
          this.usuario = data;
        },
        error: err => {
          console.error(`Error al obtener usuario: ${err}`);
        }
      });
    } else {
      // Agregar usuario
      this.opcion = 'Agregar nuevo Usuario';
      this.btnEnvEdit = {
        mensaje: 'Crear usuario',
        class: 'btn btn-success flex-grow-1 me-2 hover-btn',
        icon: 'bi bi-send-check'
      };
    }
  }

  onSubmit() {
    if (this.usuario.uid) {
      // Editar
      console.log("mi usuario edit",this.usuario)
      this.usuarioService.actualizarUsuario(this.usuario).subscribe({
        next: data => {
          this.router.navigate(['/usuarios']);
          this.notiService.mostrar(data.type, data.mensaje);
        },
        error: err => {
          console.error('Error al actualizar usuario:', err);
        }
      });
    } else {
      // Crear
      this.usuarioService.agregarUsuario(this.usuario).subscribe({
        next: data => {
          this.router.navigate(['/usuarios']);
          this.notiService.mostrar(data.type, data.mensaje);
        },
        error: err => {
          console.error('Error al crear usuario:', err);
        }
      });
    }
  }
}
