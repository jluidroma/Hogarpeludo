import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { usuarioModel } from '../../shared/models/usuario.model';
import { UsuarioserviceService } from '../../shared/services/usuarioservice.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  nombreCompleto: string = '';
  telefono: string = '';
  direccion: string = '';
  rol: string = 'user';
  showPassword: boolean = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private usuarioService: UsuarioserviceService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async registrarUsuario() {
    // Validación mejorada
    if (!this.email || !this.password || !this.nombreCompleto || !this.rol) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      // 1. Crear usuario SOLO en Firebase Auth (frontend)
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      const uid = userCredential.user.uid;

      // 2. Preparar datos para el backend (sin password)
      const usuarioParaBackend = new usuarioModel(
        uid,
        this.email,
        this.nombreCompleto,
        this.telefono,
        this.direccion,
        this.rol
      );

      console.log("Datos a enviar al backend:", usuarioParaBackend);

      // 3. Guardar en DB local a través del servicio
      this.usuarioService.agregarUsuario(usuarioParaBackend).subscribe({
        next: (res) => {
          alert(res.mensaje || 'Usuario registrado exitosamente');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en backend:', err);
          alert(`Usuario creado en Firebase pero error en backend: ${err.error?.mensaje || err.message}`);
          
          // Opcional: Revertir creación en Firebase si falla el backend
          // this.auth.currentUser.then(user => user?.delete());
        }
      });

    } catch (error: any) {
      console.error('Error en Firebase Auth:', error);
      this.handleFirebaseError(error);
    }
  }

  private handleFirebaseError(error: any) {
    let errorMessage = 'Error al registrar el usuario';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'El correo ya está registrado en Firebase';
        break;
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo no es válido';
        break;
      case 'auth/weak-password':
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Operación no permitida';
        break;
      default:
        errorMessage = `Error desconocido: ${error.message}`;
    }
    
    alert(errorMessage);
  }
}