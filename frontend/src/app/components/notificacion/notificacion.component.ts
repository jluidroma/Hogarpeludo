import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  cerrar() {
    this.cerrarNotificacion.emit();
  }
}
