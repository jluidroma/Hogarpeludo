import { Injectable } from '@angular/core';
import { SolicitudModel } from '../models/solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  BASE_URL='http://localhost:3000';
    //se le pasa un parametro http de tipo httClient
    //proporciona las capacidades para conectarse al backend
    constructor(private http:HttpClient) {}
    private getAuthHeaders() {
      const token = localStorage.getItem('firebaseToken') || '';
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    //definir los metodos para acceder a mi backend es decir al CRUD
      //trae todas las solicitudes de mi db
      obtenerSolicitudes(){
        const headers = this.getAuthHeaders();
        return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitudes/`,{headers});
      }
      //buscar una solicitud por id
      obtenerSolicitud(idsolicitud:string){
        const headers = this.getAuthHeaders();
        return this.http.get<SolicitudModel>(`${this.BASE_URL}/solicitudes/${idsolicitud}`,{ headers });
      }
    
      //agregar una solicitud
      //le pasamos como parametro un objeto solicitud de tipo SolicitudModel
      agregarSolicitud(solicitud:SolicitudModel):Observable<{ mensaje: string, type: string }>{
        return this.http.post<{ mensaje: string, type: string }>(`${this.BASE_URL}/solicitudes/`,solicitud)
      }
      //actualizar solicitud
      actualizarSolicitud(solicitud:SolicitudModel):Observable<{ mensaje: string, type: string }>{
        const headers = this.getAuthHeaders();
        return this.http.put<{ mensaje: string, type: string }>(`${this.BASE_URL}/solicitudes/${solicitud.id}`,solicitud,{ headers })
      }
      //eliminar solicitud
      eliminarSolicitud(idsolicitud:string):Observable<{ mensaje: string, type: string }>{
        const headers = this.getAuthHeaders();
        return this.http.delete<{ mensaje: string, type: string }>(`${this.BASE_URL}/solicitudes/${idsolicitud}`,{ headers })
      }
}
