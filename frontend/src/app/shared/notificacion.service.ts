import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
private confirmacionSubject = new Subject<boolean>();
private notificacionSubject = new Subject<{ tipo: string, mensaje: string } | null>();
confirmacion$ = this.confirmacionSubject.asObservable();
notificacion$ = this.notificacionSubject.asObservable();


//variables globales del servicio
public btnAcept:boolean = true;
public aceptDelet:boolean = false;
mostrar(tipo: string, mensaje: string) {
  this.notificacionSubject.next({ tipo, mensaje });
  
  if (tipo === 'success') {
    this.btnAcept = false;
    setTimeout(() => {
      this.notificacionSubject.next(null);
    }, 3000);
  }else if(tipo === 'warning'){
    this.btnAcept = true;
  }
}

confirmarEliminacion() {
  this.confirmacionSubject.next(true);
}
}
