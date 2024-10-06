import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { ListarMascotasComponent} from './listar-mascotas/listar-mascotas.component';
import { AgregarMascotasComponent} from './agregar-mascotas/agregar-mascotas.component';
import { CrearSolicitudComponent} from './crear-solicitud/crear-solicitud.component';
import { ListarSolicitudesComponent} from './listar-solicitudes/listar-solicitudes.component';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';
//import { EditarSolicitudComponent}  from './editar-solicitud/editar-solicitud.component';
//se definen las rutas y el componente al cual va a llamar con esa ruta
const routes: Routes = [
  {path:"mascotas/home", component: HomeComponent},
  {path:"mascotas/listarmascotas", component: ListarMascotasComponent},
  {path:"mascotas/agregarmascotas", component: AgregarMascotasComponent},
  {path:"mascotas/editarmascota/:idMascota", component: AgregarMascotasComponent},
  {path:"solicitud/crearsolicitud/:idMascota", component: CrearSolicitudComponent},
  {path:"solicitud/listarsolicitudes", component:ListarSolicitudesComponent},
  //{path:"solicitud/editarsolicitud/:idSolicitud", component:EditarSolicitudComponent},
  {path:"solicitud/editarsolicitud/:idSolicitud", component: ActualizarSolicitudComponent},
  {path:"**", redirectTo:"/mascotas/home",pathMatch:"full"}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
