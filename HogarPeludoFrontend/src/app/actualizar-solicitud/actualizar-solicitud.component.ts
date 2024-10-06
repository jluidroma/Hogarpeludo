import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../shared/solicitud.model';
import { SolicitudService } from '../shared/solicitud.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-solicitud',
  templateUrl: './actualizar-solicitud.component.html',
  styleUrl: './actualizar-solicitud.component.css'
})
export class ActualizarSolicitudComponent implements OnInit{
  idSolicitud='';
  solicitud=new SolicitudModel('','','','','','','','');
 //pasa dos parametros al constructor  el parametro ruta me permite capturar la ruta activa en el momento
  constructor(private solicitudService: SolicitudService, private route:ActivatedRoute, private router: Router){}
  ngOnInit(){
    this.idSolicitud=this.route.snapshot.params['idSolicitud'];
    if(this.idSolicitud){
      this.solicitudService.obtenerSolicitud(this.idSolicitud).subscribe({
        next: data=>{
          this.solicitud=data;
          console.log(this.solicitud)
        },
        error: err=>{
          console.log(`Error ${err}`);
        }
      });
    }
  }
  onUpdate(){
    if(this.solicitud.id_solicitud){
      this.solicitudService.actualizarSolicitud(this.solicitud).subscribe({
        next: data=>{
          this.router.navigate(['/solicitud/listarsolicitudes']);
        },
        error: err=>{
          console.log(`Error al actualizar ${err}`);
        }
      });
    }
  }
  }



