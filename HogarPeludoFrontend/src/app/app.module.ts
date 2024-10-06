import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MascotaService } from './shared/mascota.service';
import { SolicitudService } from './shared/solicitud.service';
//permite declarar los componentes que se va a utilizar
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ListarMascotasComponent } from './listar-mascotas/listar-mascotas.component';
import { AgregarMascotasComponent } from './agregar-mascotas/agregar-mascotas.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { ListarSolicitudesComponent } from './listar-solicitudes/listar-solicitudes.component';
//import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';
import { FormsModule } from '@angular/forms';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListarMascotasComponent,
    AgregarMascotasComponent,
    CrearSolicitudComponent,
    ListarSolicitudesComponent,
    ActualizarSolicitudComponent,
    //EditarSolicitudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    MascotaService,
    SolicitudService,
    provideHttpClient(),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
