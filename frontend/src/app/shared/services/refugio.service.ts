import { Injectable } from '@angular/core';
import { RefugioModel } from '../models/refugio.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefugioService {

  BASE_URL='http://localhost:3000';
    //se le pasa un parametro http de tipo httClient
    //proporciona las capacidades para conectarse al backend
    constructor(private http: HttpClient) {}


    private getAuthHeaders() {
    const token = localStorage.getItem('firebaseToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
    //definir los metodos para acceder a mi backend es decir al CRUD
    //trae todas los refugios de mi db
    obtenerRefugios(){

        return this.http.get<RefugioModel[]>(`${this.BASE_URL}/refugios/`);
    }
    //buscar una refugio por id
    obtenerrefugio(idrefugio:string){
      return this.http.get<RefugioModel>(`${this.BASE_URL}/refugios/${idrefugio}`);
    }
  
    //agregar una refugio
    //le pasamos como parametro un objeto refugio de tipo RefugioModel
    agregarrefugios(refugio:RefugioModel){
      const headers = this.getAuthHeaders();
      return this.http.post<string>(`${this.BASE_URL}/refugios/`,refugio,{ headers})
    }
    //actualizar refugio
    actualizarrefugio(refugio:RefugioModel){
      const headers = this.getAuthHeaders();
      return this.http.put<string>(`${this.BASE_URL}/refugios/${refugio.id}`,refugio, {headers})
    }
    //eliminar refugio
    eliminarrefugio(idrefugio:string){
      const headers = this.getAuthHeaders();
      return this.http.delete<string>(`${this.BASE_URL}/refugios/${idrefugio}`,{headers})
    }
}
