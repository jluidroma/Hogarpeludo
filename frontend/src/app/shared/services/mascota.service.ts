
import { Injectable } from '@angular/core';
import { MascotaModel } from '../models/mascota.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  
  BASE_URL='http://localhost:3000';
  //se le pasa un parametro http de tipo httClient
  //proporciona las capacidades para conectarse al backend
  constructor(private http: HttpClient) {}
  //definir los metodos para acceder a mi backend es decir al CRUD
  //trae todas las mascotas de mi db
  obtenerMascotas(){
    return this.http.get<MascotaModel[]>(`${this.BASE_URL}/mascotas/`);
  }
  //buscar una mascota por id
  obtenerMascota(idMascota:string){
    return this.http.get<MascotaModel>(`${this.BASE_URL}/mascotas/${idMascota}`);
  }

  //agregar una mascota
  //le pasamos como parametro un objeto mascota de tipo MascotaModel
  agregarMascotas(mascota:MascotaModel){
    return this.http.post<string>(`${this.BASE_URL}/mascotas/`,mascota)
  }
  //actualizar mascota
  actualizarMascota(mascota:MascotaModel){
    return this.http.put<string>(`${this.BASE_URL}/mascotas/${mascota.id}`,mascota)
  }
  //eliminar mascota
  eliminarMascota(idmascota:string){
    return this.http.delete<string>(`${this.BASE_URL}/mascotas/${idmascota}`)
  }
}
