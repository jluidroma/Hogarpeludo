import { Injectable } from '@angular/core';
import { RefugioModel } from '../models/refugio.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefugioService {

  BASE_URL='http://localhost:3000';
    //se le pasa un parametro http de tipo httClient
    //proporciona las capacidades para conectarse al backend
    constructor(private http: HttpClient) {}
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
      return this.http.post<string>(`${this.BASE_URL}/refugios/`,refugio)
    }
    //actualizar refugio
    actualizarrefugio(refugio:RefugioModel){
      return this.http.put<string>(`${this.BASE_URL}/refugios/${refugio.id}`,refugio)
    }
    //eliminar refugio
    eliminarrefugio(idrefugio:string){
      return this.http.delete<string>(`${this.BASE_URL}/refugios/${idrefugio}`)
    }
}
