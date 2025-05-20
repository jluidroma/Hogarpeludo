import { Component } from '@angular/core';
import { MascotaModel } from '../../../shared/models/mascota.model';
import { MascotaService } from '../../../shared/services/mascota.service';
import { Observable } from 'rxjs';
import { RouterLink,RouterLinkActive  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-mascotas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule,RouterModule],
  templateUrl: './list-mascotas.component.html',
  styleUrl: './list-mascotas.component.css'
})
export class ListMascotasComponent {
title = 'Mascotas en adopción'
  //IMPORTAR las mascotas creadas de nuestra base  de datos
  mascotas: Observable<MascotaModel[]> | undefined;
  

  constructor(
    private mascotaService: MascotaService,

  ) {}


  ngOnInit() {
    //hago uso de los metodos creados en el servicio
    this.mascotas = this.mascotaService.obtenerMascotas();

  }

  eliminarMascota(idMascota: string) {
    //el subscribe es para el caso que todo salga bien o de que haya un error
    this.mascotaService.eliminarMascota(idMascota).subscribe({
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
