import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
     {
          path:'',
          component: HomeComponent
     },
     {
          path:"mascotas",
          component: MascotasComponent
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
