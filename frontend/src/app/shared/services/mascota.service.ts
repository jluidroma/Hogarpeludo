import { Injectable } from '@angular/core';
import { MascotaModel } from '../models/mascota.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('firebaseToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  obtenerMascotas() {
    return this.http.get<MascotaModel[]>(`${this.BASE_URL}/mascotas/`);
  }

  obtenerMascota(idMascota: string) {
    const headers = this.getAuthHeaders();
    return this.http.get<MascotaModel>(`${this.BASE_URL}/mascotas/${idMascota}`, { headers });
  }

  //agregar una mascota
  //le pasamos como parametro un objeto mascota de tipo MascotaModel
  agregarMascotas(mascota:MascotaModel):Observable<{ mensaje: string, type: string }>{
    const headers = this.getAuthHeaders();
    return this.http.post<{ mensaje: string, type: string }>(`${this.BASE_URL}/mascotas/`,mascota, { headers })
  }
  //actualizar mascota
  actualizarMascota(mascota:MascotaModel):Observable<{ mensaje: string, type: string }>{
    const headers = this.getAuthHeaders();
    return this.http.put<{ mensaje: string, type: string }>(`${this.BASE_URL}/mascotas/${mascota.id}`,mascota, { headers })
  }
  //eliminar mascota
  eliminarMascota(idmascota:string):Observable<{ mensaje: string, type: string }>{
    const headers = this.getAuthHeaders();
    return this.http.delete<{ mensaje: string, type: string }>(`${this.BASE_URL}/mascotas/${idmascota}`, { headers })
  }
}
