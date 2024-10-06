import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { SolicitudModel } from '../shared/solicitud.model';
import { MascotaService } from '../shared/mascota.service';
import { ActivatedRoute,Router } from '@angular/router';
import { SolicitudService } from '../shared/solicitud.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrl: './crear-solicitud.component.css'
})
export class CrearSolicitudComponent implements OnInit {
  idMascota='';
  solicitud=new SolicitudModel('','','','','','','','');
  mascota=new MascotaModel('','','','','','','','');
   //pasa dos parametros al constructor  el parametro ruta me permite capturar la ruta activa en el momento
  constructor(private mascotaService: MascotaService,private solicitudService: SolicitudService, private route:ActivatedRoute, private router: Router){
  }
  ngOnInit(){
    this.idMascota=this.route.snapshot.params['idMascota'];

    if(this.idMascota){
      this.mascotaService.obtenerMascota(this.idMascota).subscribe({
        next: data=>{
          this.mascota=data;
          console.log(this.mascota);
        },
        error: err=>{
          console.log(`Error ${err}`);
        }
      });
    }
  }

  onSubmit(){
    this.solicitud.id_mascota=this.idMascota;
    this.solicitud.estado='En espera'
      this.solicitud.fecha= new Date().toString();
      console.log(this.solicitud)
      this.solicitudService.agregarSolicitud(this.solicitud).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/mascotas/listarmascotas']);
        },
        error: err=>{
          console.log(`Error al Agregar ${err}`);
        }
      });
  }
}
