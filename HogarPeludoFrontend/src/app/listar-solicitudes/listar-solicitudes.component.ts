import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../shared/solicitud.model';
import { Observable } from 'rxjs';
import { SolicitudService } from '../shared/solicitud.service';
import { MascotaService } from '../shared/mascota.service';
import { MascotaModel } from '../shared/mascota.model';

@Component({
  selector: 'app-listar-solicitudes',
  templateUrl: './listar-solicitudes.component.html',
  styleUrl: './listar-solicitudes.component.css'
})
//
export class ListarSolicitudesComponent implements OnInit{
  //IMPORTAR las solicitudes creadas de nuestra base  de datos
  tituloSol='Solicitudes'
  mascota=new MascotaModel('','','','','','','','')
  solicitud=new SolicitudModel('','','','','','','','')
  solicitudes: Observable<SolicitudModel[]>| undefined;
  constructor (private solicitudService: SolicitudService, private mascotaService: MascotaService){}

  ngOnInit(){
    //hago uso de los metodos creados en el servicio
    this.solicitudes = this.solicitudService.obtenerSolicitudes();
  }
  eliminarSolicitud(idSolicitud:string){
    //el subscribe es para el caso que todo salga bien o de que haya un error
    this.solicitudService.eliminarSolicitud(idSolicitud).subscribe({
      next: data=>{
        console.log(`Registro Eliminado`);
        this.ngOnInit();
      },
      error: err=>{
        console.log(`Error al eliminar Registro ${err}`);
      }
    });
  }

  aceptarSolicitud(idSolicitud: string) {
    console.log(`La solicitud a aceptar tiene id ${idSolicitud}`);
    
    if (idSolicitud) {
      // Obtener la solicitud por id
      this.solicitudService.obtenerSolicitud(idSolicitud).subscribe({
        next: (data) => {
          this.solicitud = data;
          this.solicitud.estado = 'Aceptada';
          
          // Actualizar la solicitud 
          this.solicitudService.actualizarSolicitud(this.solicitud).subscribe({
            next: () => {
              console.log('Solicitud actualizada exitosamente');
              this.ngOnInit(); // Recargar datos después de la actualización
              
              // Obtener la mascota por id
              this.mascotaService.obtenerMascota(this.solicitud.id_mascota).subscribe({
                next: (mascotaData) => {
                  this.mascota = mascotaData;
                  this.mascota.estado_adopcion = 'Adoptado';
                  
                  // Actualizar el estado de adopción de la mascota
                  this.mascotaService.actualizarMascota(this.mascota).subscribe({
                    next: () => {
                      console.log('Mascota actualizada exitosamente');
                    },
                    error: (err) => {
                      console.error('Error al actualizar la mascota:', err);
                    }
                  });
                },
                error: (err) => {
                  console.error('Error al obtener la mascota:', err);
                }
              });
            },
            error: (err) => {
              console.error('Error al actualizar la solicitud:', err);
            }
          });
        },
        error: (err) => {
          console.error(`Error al obtener la solicitud: ${err}`);
        }
      });
    }
  }
  
  
}
