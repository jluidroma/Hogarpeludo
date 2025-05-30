import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VoluntarioModel } from '../models/voluntario.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {
  BASE_URL='http://localhost:3000';
  //se le pasa un parametro http de tipo httClient
  //proporciona las capacidades para conectarse al backend
  constructor(private http:HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('firebaseToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  //definir los metodos para acceder a mi backend es decir al CRUD
    //trae todas las voluntarios de mi db
    obtenerVoluntarios(){
      return this.http.get<VoluntarioModel[]>(`${this.BASE_URL}/voluntarios/`);
    }
    //buscar una voluntario por id
    obtenerVoluntario(idvoluntario:string){
      return this.http.get<VoluntarioModel>(`${this.BASE_URL}/voluntarios/${idvoluntario}`);
    }
  
    //agregar una voluntario
    //le pasamos como parametro un objeto voluntario de tipo VoluntarioModel
    agregarVoluntario(voluntario:VoluntarioModel){
      const headers = this.getAuthHeaders();
      return this.http.post<string>(`${this.BASE_URL}/voluntarios/`,voluntario, { headers })
    }
    //actualizar voluntario
    actualizarVoluntario(voluntario:VoluntarioModel){
      const headers = this.getAuthHeaders();
      return this.http.put<string>(`${this.BASE_URL}/voluntarios/${voluntario.id}`,voluntario, { headers })
    }
    //eliminar voluntario
    eliminarVoluntario(idvoluntario:string){
      const headers = this.getAuthHeaders();
      return this.http.delete<string>(`${this.BASE_URL}/voluntarios/${idvoluntario}`, { headers })
    }

}
