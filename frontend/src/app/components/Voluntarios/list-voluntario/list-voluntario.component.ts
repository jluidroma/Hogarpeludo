import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { VoluntarioModel } from '../../../shared/models/voluntario.model';
import { VoluntarioService } from '../../../shared/services/voluntario.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/auth-service.service';
@Component({
  selector: 'app-list-voluntario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule,RouterModule],
  templateUrl: './list-voluntario.component.html',
  styleUrl: './list-voluntario.component.css'
})
export class ListVoluntarioComponent {
title = 'nuestros voluntarios'
  //IMPORTAR las voluntarios creadas de nuestra base  de datos
  voluntarios: Observable<VoluntarioModel[]> | undefined;
  
  public isAdmin = false;

  constructor(
    private voluntarioService: VoluntarioService,
    public authService: AuthService

  ) {}


  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'admin';
    });
    //hago uso de los metodos creados en el servicio
    this.voluntarios = this.voluntarioService.obtenerVoluntarios();

  }

  eliminarVoluntario(id: string) {
    //el subscribe es para el caso que todo salga bien o de que haya un error
    this.voluntarioService.eliminarVoluntario(id).subscribe({
      next: data => {
        console.log(`Registro Eliminado`);
        this.ngOnInit();
      },
      error: err => {
        console.log(`Error al eliminar Registro ${err}`);
      }
    });
  }
}
