import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoluntarioService } from '../../../shared/services/voluntario.service';
import { VoluntarioModel } from '../../../shared/models/voluntario.model';
import { RefugioModel } from '../../../shared/models/refugio.model';
import { RefugioService } from '../../../shared/services/refugio.service';
import { ActivatedRoute,Router  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotificacionService } from '../../../shared/notificacion.service';

@Component({
  selector: 'app-add-voluntario',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './add-voluntario.component.html',
  styleUrl: './add-voluntario.component.css'
})
export class AddVoluntarioComponent {
  opcion:string=''
  id:string =''
  refugioSeleccionado:string = '';
  //importa nuestros refugios creados en nuestra base de datos
  refugios: Observable<RefugioModel[]> | undefined;
    //btn agregar refugio, editar refugio
    btnEnvEdit = {
      mensaje:'',
      class:'',
      icon:''
    }
    refugio=new RefugioModel('','','','','');
    voluntario=new VoluntarioModel('','','','','','','','')
    //pasa dos parametros al constructor  el parametro ruta me permite capturar la ruta activa en el momento
    constructor(
      private voluntarioService: VoluntarioService, private route:ActivatedRoute, private router: Router,
      private refugioService: RefugioService, 
      private notiService: NotificacionService
    ){
        
    }
    ngOnInit(){
      console.log(`la ruta actual es: ${this.route}`)
      this.id=this.route.snapshot.params['id'];
      console.log(`El id de refugio es ${this.id}`);
      this.refugios = this.refugioService.obtenerRefugios();
      if(this.id){
        //Viene de Editar
        this.opcion='Editar Voluntario';
        this.btnEnvEdit.mensaje='Actualizar datos';
        this.btnEnvEdit.class="btn btn-primary flex-grow-1 me-2 hover-btn";
        this.btnEnvEdit.icon="bi bi-pencil-square";
        this.voluntarioService.obtenerVoluntario(this.id).subscribe({
          next: data=>{
            console.log(data);
            this.voluntario=data;
            console.log(this.voluntario);
          },
          error: err=>{
            console.log(`Error ${err}`);
          }
  
        });
      }else{
        this.opcion='Agregar Voluntario';
        this.btnEnvEdit.mensaje='Enviar datos';
        this.btnEnvEdit.class="btn btn-success flex-grow-1 me-2 hover-btn";
        this.btnEnvEdit.icon="bi bi-send-check";
      }
    }
  
    onSubmit(){
      if(this.voluntario.id){
        this.voluntarioService.actualizarVoluntario(this.voluntario).subscribe({
          next: data=>{
            console.log(data);
            this.router.navigate(['/voluntarios/']);
            this.notiService.mostrar(data.type, data.mensaje);
          },
          error: err=>{
            console.log(`Error al actualizar ${err}`);
          }
        });
      }
      else{
        this.voluntarioService.agregarVoluntario(this.voluntario).subscribe({
          next: data=>{
            this.router.navigate(['/voluntarios']);
            this.notiService.mostrar(data.type, data.mensaje);
          },
          error: err=>{
            console.log(`Error al Agregar ${err}`);
          }
        });
      }
    }
}
