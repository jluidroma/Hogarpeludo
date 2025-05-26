import { Injectable } from '@angular/core';
import { MascotaModel } from '../models/mascota.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const headers = this.getAuthHeaders();
    return this.http.get<MascotaModel[]>(`${this.BASE_URL}/mascotas/`, { headers });
  }

  obtenerMascota(idMascota: string) {
    const headers = this.getAuthHeaders();
    return this.http.get<MascotaModel>(`${this.BASE_URL}/mascotas/${idMascota}`, { headers });
  }

  agregarMascotas(mascota: MascotaModel) {
    const headers = this.getAuthHeaders();
    return this.http.post<string>(`${this.BASE_URL}/mascotas/`, mascota, { headers });
  }

  actualizarMascota(mascota: MascotaModel) {
    const headers = this.getAuthHeaders();
    return this.http.put<string>(`${this.BASE_URL}/mascotas/${mascota.id}`, mascota, { headers });
  }

  eliminarMascota(idmascota: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete<string>(`${this.BASE_URL}/mascotas/${idmascota}`, { headers });
  }
}
