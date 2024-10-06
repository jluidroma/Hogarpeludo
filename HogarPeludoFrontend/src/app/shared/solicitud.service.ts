import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudModel } from './solicitud.model';
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  BASE_URL='http://localhost:3000';
  //proporciona las capacidades para conectarse al backend
  //se le pasa un parametro http de tipo httClient
  constructor(private http: HttpClient) { 
  }
  //definir los metodos para acceder a mi backend es decir al CRUD
  //trae todas las solicitudes realizadas de mi db(hogarperruno)
  obtenerSolicitudes(){
    return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitud/buscarsolicitudes`);
  }
  //buscar una solicitud por id
  obtenerSolicitud(idSolicitud:string){
    return this.http.get<SolicitudModel>(`${this.BASE_URL}/solicitud/buscarsolicitudid/${idSolicitud}`);
  }

  //agregar una solicitud
  //le pasamos como parametro un objeto solicitud de tipo Solicitudmodel
  agregarSolicitud(solicitud:SolicitudModel){
    return this.http.post<string>(`${this.BASE_URL}/solicitud/crearsolicitud/${solicitud.id_mascota}`,solicitud)
  }
  //actualizar solicitud
  actualizarSolicitud(solicitud:SolicitudModel){
    return this.http.put<string>(`${this.BASE_URL}/solicitud/actualizarsolicitud/${solicitud.id_solicitud}`,solicitud)
  }
  //eliminar solicitud
  eliminarSolicitud(idSolicitud:string){
    return this.http.delete<string>(`${this.BASE_URL}/solicitud/eliminarsolicitud/${idSolicitud}`)
  }
}
