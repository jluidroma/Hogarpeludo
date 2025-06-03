import { Component } from '@angular/core';
import { RefugioModel } from '../../../shared/models/refugio.model';
import { RefugioService } from '../../../shared/services/refugio.service';
import { Observable } from 'rxjs';
import { RouterLink,RouterLinkActive  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth-service.service';
import { NotificacionService } from '../../../shared/notificacion.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-list-refugio',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule,RouterModule],
  templateUrl: './list-refugio.component.html',
  styleUrl: './list-refugio.component.css'
})
export class ListRefugioComponent implements OnInit {
  refugios: Observable<RefugioModel[]> | undefined;
  idRefugioPendiente: string | null = null;

  constructor(
    private refugioservice: RefugioService,
    public authService: AuthService,
    private notiService: NotificacionService
  ) {}

  ngOnInit() {
    this.refugios = this.refugioservice.obtenerRefugios();

    this.notiService.confirmacion$.subscribe(confirmado => {
      if (confirmado && this.idRefugioPendiente) {
        this.eliminarRefugioFinal(this.idRefugioPendiente);
        this.idRefugioPendiente = null;
      }
    });
  }

  eliminarRefugio(id: string) {
    this.idRefugioPendiente = id;
    this.notiService.mostrar(
      'warning',
      '¿Está seguro que quiere eliminar el refugio? Esta acción no se puede deshacer.'
    );
  }

  eliminarRefugioFinal(id: string) {
    this.refugioservice.eliminarrefugio(id).subscribe({
      next: data => {
        console.log('Refugio eliminado');
        this.notiService.mostrar(data.type, data.mensaje);
        this.ngOnInit(); 
      },
      error: err => {
        this.notiService.mostrar('error', "error al eliminar el registro");
      }
    });
  }
}