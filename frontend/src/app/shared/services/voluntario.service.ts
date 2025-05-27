import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VoluntarioModel } from '../models/voluntario.model';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {
  BASE_URL='http://localhost:3000';
  //se le pasa un parametro http de tipo httClient
  //proporciona las capacidades para conectarse al backend
  constructor(private http:HttpClient) {}
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
      return this.http.post<string>(`${this.BASE_URL}/voluntarios/`,voluntario)
    }
    //actualizar voluntario
    actualizarVoluntario(voluntario:VoluntarioModel){
      return this.http.put<string>(`${this.BASE_URL}/voluntarios/${voluntario.id}`,voluntario)
    }
    //eliminar voluntario
    eliminarVoluntario(idvoluntario:string){
      return this.http.delete<string>(`${this.BASE_URL}/voluntarios/${idvoluntario}`)
    }

}
