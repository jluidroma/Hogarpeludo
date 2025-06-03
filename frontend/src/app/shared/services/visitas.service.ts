import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisitaModel } from '../models/visita.model';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  BASE_URL='http://localhost:3000';
    //se le pasa un parametro http de tipo httClient
    //proporciona las capacidades para conectarse al backend
    constructor(private http:HttpClient) {}

    private getAuthHeaders() {
      const token = localStorage.getItem('firebaseToken') || '';
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    //definir los metodos para acceder a mi backend es decir al CRUD
      //trae todas las visitas de mi db
      obtenerVisitas(){
        const headers = this.getAuthHeaders();
        return this.http.get<VisitaModel[]>(`${this.BASE_URL}/visitas/`,{headers});
      }
      //buscar una visita por id
      obtenerVisita(idvisita:string){
        const headers = this.getAuthHeaders();
        return this.http.get<VisitaModel>(`${this.BASE_URL}/visitas/${idvisita}`,{ headers });
      }
    
      //agregar una visita
      //le pasamos como parametro un objeto visita de tipo VisitaModel
      agregarVisita(visita:VisitaModel):Observable<{ mensaje: string, type: string }>{
        const headers = this.getAuthHeaders();
        return this.http.post<{ mensaje: string, type: string }>(`${this.BASE_URL}/visitas/`,visita,{ headers })
      }
      //actualizar visita
      actualizarVisita(visita:VisitaModel):Observable<{ mensaje: string, type: string }>{
        const headers = this.getAuthHeaders();
        return this.http.put<{ mensaje: string, type: string }>(`${this.BASE_URL}/visitas/${visita.id}`,visita,{ headers })
      }
      //eliminar visita
      eliminarVisita(idvisita:string):Observable<{ mensaje: string, type: string }>{
        const headers = this.getAuthHeaders();
        return this.http.delete<{ mensaje: string, type: string }>(`${this.BASE_URL}/visitas/${idvisita}`,{ headers })
      }
}
