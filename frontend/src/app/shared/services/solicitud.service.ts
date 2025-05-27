import { Injectable } from '@angular/core';
import { SolicitudModel } from '../models/solicitud.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  BASE_URL='http://localhost:3000';
    //se le pasa un parametro http de tipo httClient
    //proporciona las capacidades para conectarse al backend
    constructor(private http:HttpClient) {}
    //definir los metodos para acceder a mi backend es decir al CRUD
      //trae todas las solicitudes de mi db
      obtenerSolicitudes(){
        return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitudes/`);
      }
      //buscar una solicitud por id
      obtenerSolicitud(idsolicitud:string){
        return this.http.get<SolicitudModel>(`${this.BASE_URL}/solicitudes/${idsolicitud}`);
      }
    
      //agregar una solicitud
      //le pasamos como parametro un objeto solicitud de tipo SolicitudModel
      agregarSolicitud(solicitud:SolicitudModel){
        return this.http.post<string>(`${this.BASE_URL}/solicitudes/`,solicitud)
      }
      //actualizar solicitud
      actualizarSolicitud(solicitud:SolicitudModel){
        return this.http.put<string>(`${this.BASE_URL}/solicitudes/${solicitud.id}`,solicitud)
      }
      //eliminar solicitud
      eliminarSolicitud(idsolicitud:string){
        return this.http.delete<string>(`${this.BASE_URL}/solicitudes/${idsolicitud}`)
      }
}
