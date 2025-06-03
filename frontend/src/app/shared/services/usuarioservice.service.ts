import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioserviceService {

  private readonly BASE_URL = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  /** Obtiene el token desde localStorage y lo agrega al header Authorization */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('firebaseToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** Lista todos los usuarios */
  obtenerUsuarios(): Observable<usuarioModel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<usuarioModel[]>(`${this.BASE_URL}/`, { headers });
  }

  /** Obtiene un usuario por su UID */
  obtenerUsuario(uid: string): Observable<usuarioModel> {
    const headers = this.getAuthHeaders();
    return this.http.get<usuarioModel>(`${this.BASE_URL}/${uid}`, { headers });
  }

  /** Crea un nuevo usuario (Firebase + DB local) */
  agregarUsuario(usuario: Partial<usuarioModel>): Observable<{ mensaje: string, type: string }> {
    return this.http.post<{ mensaje: string, type: string }>(`${this.BASE_URL}/`, usuario);
  }

  /** Actualiza un usuario (solo DB local) */
  actualizarUsuario(usuario: Partial<usuarioModel>): Observable<{ mensaje: string, type: string }> {
    const headers = this.getAuthHeaders();
    return this.http.put<{ mensaje: string, type: string }>(`${this.BASE_URL}/${usuario.uid}`, usuario, { headers });
  }

  /** Elimina un usuario por UID */
  eliminarUsuario(uid: string): Observable<{ mensaje: string, type: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ mensaje: string, type: string }>(`${this.BASE_URL}/${uid}`, { headers });
  }
}
