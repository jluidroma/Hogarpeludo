import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../shared/mascota.service';
import { ActivatedRoute,Router  } from '@angular/router';
import { MascotaModel } from '../shared/mascota.model';

@Component({
  selector: 'app-agregar-mascotas',
  templateUrl: './agregar-mascotas.component.html',
  styleUrl: './agregar-mascotas.component.css'
})
export class AgregarMascotasComponent implements OnInit{
  opcion=''
  idMascota =''
  //btn agregar mascota, editarmascota
  btnEnvEdit = {
    mensaje:'',
    class:'',
    icon:''
  }
  mascota =new MascotaModel('','','','','','','','');
  //pasa dos parametros al constructor  el parametro ruta me permite capturar la ruta activa en el momento
  constructor(private mascotaService: MascotaService, private route:ActivatedRoute, private router: Router){

  }
  ngOnInit(){
    console.log(`la ruta actual es: ${this.route}`)
    this.idMascota=this.route.snapshot.params['idMascota'];
    console.log(`El idMascota es ${this.idMascota}`);

    if(this.idMascota){
      //Viene de Editar
      this.opcion='Editar Mascota';
      this.btnEnvEdit.mensaje='Actualizar datos';
      this.btnEnvEdit.class="btn btn-primary flex-grow-1 me-2 hover-btn";
      this.btnEnvEdit.icon="bi bi-pencil-square";
      console.log('La solicitud viene de Editar');
      this.mascotaService.obtenerMascota(this.idMascota).subscribe({
        next: data=>{
          console.log(data);
          this.mascota=data;
          console.log(this.mascota);
        },
        error: err=>{
          console.log(`Error ${err}`);
        }

      });
    }else{
      this.opcion='Agregar una nueva Mascota';
      this.btnEnvEdit.mensaje='Enviar datos';
      this.btnEnvEdit.class="btn btn-success flex-grow-1 me-2 hover-btn";
      this.btnEnvEdit.icon="bi bi-send-check";
    }
  }

  onSubmit(){
    if(this.mascota.id){
      this.mascotaService.actualizarMascota(this.mascota).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/mascotas/listarmascotas']);
        },
        error: err=>{
          console.log(`Error al actualizar ${err}`);
        }
      });
    }
    else{
      this.mascota.estado_adopcion="no adoptado"
      console.log(this.mascota)
      this.mascotaService.agregarMascotas(this.mascota).subscribe({
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
}
