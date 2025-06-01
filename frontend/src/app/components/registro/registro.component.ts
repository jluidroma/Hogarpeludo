import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // Agrega CommonModule aquí
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private auth: Auth, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  registrarUsuario() {
    if (!this.email || !this.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        let errorMessage = 'Error al registrar el usuario';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'El correo ya está registrado';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El correo no es válido';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña debe tener al menos 6 caracteres';
            break;
          default:
            errorMessage = error.message;
        }
        alert(errorMessage);
      });
  }
}