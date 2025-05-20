import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MascotaModel } from '../../shared/models/mascota.model';
import { MascotaService } from '../../shared/services/mascota.service';
import { Observable } from 'rxjs';
import { RouterLink,RouterLinkActive  } from '@angular/router';



@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink, RouterLinkActive],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})

  export class MascotasComponent implements OnInit {
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

