import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RefugioService } from '../../../shared/services/refugio.service';
import { RefugioModel } from '../../../shared/models/refugio.model';
import { ActivatedRoute,Router  } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-refugio',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './add-refugio.component.html',
  styleUrl: './add-refugio.component.css'
})
export class AddRefugioComponent {
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
  //pasa dos parametros al constructor  el parametro ruta me permite capturar la ruta activa en el momento
  constructor(
    private refugioService: RefugioService, private route:ActivatedRoute, private router: Router, 
  ){
      
  }
  ngOnInit(){
    console.log(`la ruta actual es: ${this.route}`)
    this.id=this.route.snapshot.params['id'];
    console.log(`El id de refugio es ${this.id}`);
    this.refugios = this.refugioService.obtenerRefugios();
    if(this.id){
      //Viene de Editar
      this.opcion='Editar Refugio';
      this.btnEnvEdit.mensaje='Actualizar datos';
      this.btnEnvEdit.class="btn btn-primary flex-grow-1 me-2 hover-btn";
      this.btnEnvEdit.icon="bi bi-pencil-square";
      this.refugioService.obtenerrefugio(this.id).subscribe({
        next: data=>{
          console.log(data);
          this.refugio=data;
          console.log(this.refugio);
        },
        error: err=>{
          console.log(`Error ${err}`);
        }

      });
    }else{
      this.opcion='Agregar una nuevo Refugio';
      this.btnEnvEdit.mensaje='Enviar datos';
      this.btnEnvEdit.class="btn btn-success flex-grow-1 me-2 hover-btn";
      this.btnEnvEdit.icon="bi bi-send-check";
    }
  }

  onSubmit(){
    if(this.refugio.id){
      this.refugioService.actualizarrefugio(this.refugio).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/refugios/']);
        },
        error: err=>{
          console.log(`Error al actualizar ${err}`);
        }
      });
    }
    else{
      this.refugioService.agregarrefugios(this.refugio).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/refugios']);
        },
        error: err=>{
          console.log(`Error al Agregar ${err}`);
        }
      });
    }
  }
}
