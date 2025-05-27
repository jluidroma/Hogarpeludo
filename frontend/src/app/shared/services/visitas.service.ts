import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisitaModel } from '../models/visita.model';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  BASE_URL='http://localhost:3000';
    //se le pasa un parametro http de tipo httClient
    //proporciona las capacidades para conectarse al backend
    constructor(private http:HttpClient) {}
    //definir los metodos para acceder a mi backend es decir al CRUD
      //trae todas las visitas de mi db
      obtenerVisitas(){
        return this.http.get<VisitaModel[]>(`${this.BASE_URL}/visitas/`);
      }
      //buscar una visita por id
      obtenerVisita(idvisita:string){
        return this.http.get<VisitaModel>(`${this.BASE_URL}/visitas/${idvisita}`);
      }
    
      //agregar una visita
      //le pasamos como parametro un objeto visita de tipo VisitaModel
      agregarVisita(visita:VisitaModel){
        return this.http.post<string>(`${this.BASE_URL}/visitas/`,visita)
      }
      //actualizar visita
      actualizarVisita(visita:VisitaModel){
        return this.http.put<string>(`${this.BASE_URL}/visitas/${visita.id}`,visita)
      }
      //eliminar visita
      eliminarVisita(idvisita:string){
        return this.http.delete<string>(`${this.BASE_URL}/visitas/${idvisita}`)
      }
}
