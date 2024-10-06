import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';
@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.css'
})
export class ListarMascotasComponent implements OnInit{
  title='Mascotas en adopción'
  //IMPORTAR las mascotas creadas de nuestra base  de datos
  mascotas: Observable<MascotaModel[]>| undefined;
  constructor (private mascotaService: MascotaService){}
  ngOnInit(){
    //hago uso de los metodos creados en el servicio
    this.mascotas=this.mascotaService.obtenerMascotas();
  }
  eliminarMascota(idMascota:string){
    //el subscribe es para el caso que todo salga bien o de que haya un error
    this.mascotaService.eliminarMascota(idMascota).subscribe({
      next: data=>{
        console.log(`Registro Eliminado`);
        this.ngOnInit();
      },
      error: err=>{
        console.log(`Error al eliminar Registro ${err}`);
      }
    });
  }
}
