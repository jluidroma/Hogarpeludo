import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MascotaModel } from '../../../shared/models/mascota.model';
import { MascotaService } from '../../../shared/services/mascota.service';
import { ActivatedRoute,Router  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RefugioModel } from '../../../shared/models/refugio.model';
import { RefugioService } from '../../../shared/services/refugio.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../shared/notificacion.service';
import { AuthService } from '../../../shared/auth-service.service';

@Component({
  selector: 'app-add-mascota',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './add-mascota.component.html',
  styleUrl: './add-mascota.component.css'
})
export class AddMascotaComponent {
opcion:string=''
id:string =''
refugioSeleccionado:string = '';
//importa nuestros refugios creados en nuestra base de datos
refugios: Observable<RefugioModel[]> | undefined;
  //btn agregar mascota, editarmascota
  btnEnvEdit = {
    mensaje:'',
    class:'',
    icon:''
  }
  public isAdmin = false;
  mascota=new MascotaModel('','','','','','','','','');
  refugio=new RefugioModel('','','','','');


  //pasa dos parametros al constructor  el parametro ruta me permite capturar la ruta activa en el momento
  constructor(
    private mascotaService: MascotaService, private route:ActivatedRoute, private router: Router,
    private refugioSerice: RefugioService,
    private notiService:NotificacionService,
    public authService: AuthService
  ){
      
  }
  ngOnInit(){
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'admin';
    });
    console.log(`la ruta actual es: ${this.route}`)
    this.id=this.route.snapshot.params['id'];
    console.log(`El id de mascota es ${this.id}`);
    this.refugios = this.refugioSerice.obtenerRefugios();
    if(this.id){
      //Viene de Editar
      this.opcion='Editar Mascota';
      this.btnEnvEdit.mensaje='Actualizar datos';
      this.btnEnvEdit.class="btn btn-primary flex-grow-1 me-2 hover-btn";
      this.btnEnvEdit.icon="bi bi-pencil-square";
      this.mascotaService.obtenerMascota(this.id).subscribe({
        next: data=>{
          console.log(data);
          this.mascota=data
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
          this.router.navigate(['/mascotas/']);
          this.notiService.mostrar('success',data.mensaje)
          
          

        },
        error: err=>{
          console.log(`Error al actualizar ${err}`);
        }
      });
    }
    else{
      this.mascota.estado_adopcion="no adoptado"
      this.mascota.id_refugio=this.refugioSeleccionado;
      this.mascotaService.agregarMascotas(this.mascota).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/mascotas']);
          this.notiService.mostrar('success',data.mensaje)

        },
        error: err=>{
          console.log(`Error al Agregar ${err}`);
        }
      });
    }
  }
}
