import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  private auth = inject(Auth);
  private router = inject(Router);

  login() {
  this.successMessage = '';
  this.errorMessage = '';

  signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then(async userCredential => {
      this.successMessage = '¡Ingreso exitoso!';
      console.log('Login exitoso:', userCredential);

      // Obtener el token JWT
      const token = await userCredential.user.getIdToken();
      console.log('Token de ID de Firebase:', token);

      // Aquí puedes almacenar el token para usarlo en tu app o enviar al backend
      // Por ejemplo:
      localStorage.setItem('firebaseToken', token);

      // Luego rediriges a la página principal o donde quieras
      setTimeout(() => {
        this.router.navigate(['/mascotas']);
      }, 2000);
    })
    .catch(error => {
      console.error('Error de login:', error);
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'Usuario no existe.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Contraseña incorrecta.';
      } else {
        this.errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
      }
    });
}
}