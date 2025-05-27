import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { AddMascotaComponent } from './components/mascotas/add-mascota/add-mascota.component';
import { ListMascotasComponent } from './components/mascotas/list-mascotas/list-mascotas.component';
import { ListRefugioComponent } from './components/Refugios/list-refugio/list-refugio.component';
import { AddRefugioComponent } from './components/Refugios/add-refugio/add-refugio.component';
import { AddVoluntarioComponent } from './components/Voluntarios/add-voluntario/add-voluntario.component';
import { ListVoluntarioComponent } from './components/Voluntarios/list-voluntario/list-voluntario.component';

export const routes: Routes = [
     {
          path:'',
          component: HomeComponent
     },
     {
          path:"mascotas",
          component: ListMascotasComponent
     },
     {
          path:"mascotas/add",
          component: AddMascotaComponent
     },
     {
          path:"mascotas/edit/:id",
          component: AddMascotaComponent
     },
     {
          path:"refugios/add",
          component: AddRefugioComponent
     },
     {
          path:"refugios",
          component: ListRefugioComponent
     },
     {
          path:"refugios/edit/:id",
          component: AddRefugioComponent
     },
     {
          path:"voluntarios",
          component: ListVoluntarioComponent
     },
     {
          path:"voluntarios/add",
          component: AddVoluntarioComponent
     },
     {
          path: "voluntarios/edit/:id",
          component: AddVoluntarioComponent
     },
     {
          path:"registro",
          component: RegistroComponent
     },
     {
          path:"login",
          component: LoginComponent
     }
];
