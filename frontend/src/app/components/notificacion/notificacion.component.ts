import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../shared/notificacion.service';
@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
  @Input() tipo: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() mensaje: string = '';
  @Output() cerrarNotificacion = new EventEmitter<void>();

  constructor(
    public notiService:NotificacionService,
  ){}

  cerrar() {
    this.notiService.aceptDelet = true;
    this.notiService.confirmarEliminacion();  
    this.cerrarNotificacion.emit();
  }
  cancelar() {
    this.notiService.aceptDelet = false; 
    this.cerrarNotificacion.emit();
  }


}
