import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificacionSubject = new Subject<{ tipo: string, mensaje: string }>();
  notificacion$ = this.notificacionSubject.asObservable();

  mostrar(tipo: 'success' | 'error' | 'warning' | 'info', mensaje: string) {
    this.notificacionSubject.next({ tipo, mensaje });
  }

  mostrarErrorHttp(codigo: number) {
    switch (codigo) {
      case 400:
        this.mostrar('error', 'Solicitud incorrecta');
        break;
      case 401:
        this.mostrar('error', 'No autorizado');
        break;
      case 403:
        this.mostrar('error', 'Acceso denegado');
        break;
      case 404:
        this.mostrar('warning', 'Recurso no encontrado');
        break;
      case 500:
        this.mostrar('error', 'Error interno del servidor');
        break;
      case 200:
        this.mostrar('success', 'Recurso creado exitosamente');
        break;
      default:
        this.mostrar('error', `Error inesperado: ${codigo}`);
    }
  }
}
