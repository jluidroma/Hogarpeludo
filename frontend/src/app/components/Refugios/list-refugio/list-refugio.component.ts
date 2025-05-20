import { Component } from '@angular/core';
import { RefugioModel } from '../../../shared/models/refugio.model';
import { RefugioService } from '../../../shared/services/refugio.service';
import { Observable } from 'rxjs';
import { RouterLink,RouterLinkActive  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-refugio',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule,RouterModule],
  templateUrl: './list-refugio.component.html',
  styleUrl: './list-refugio.component.css'
})
export class ListRefugioComponent {
  //IMPORTAR las mascotas creadas de nuestra base  de datos
  refugios: Observable<RefugioModel[]> | undefined;
  

  constructor(
    private refugioservice: RefugioService,

  ) {}


  ngOnInit() {
    //hago uso de los metodos creados en el servicio
    this.refugios = this.refugioservice.obtenerRefugios();

  }

  eliminarRefugio(id: string) {
    //el subscribe es para el caso que todo salga bien o de que haya un error
    this.refugioservice.eliminarrefugio(id).subscribe({
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
