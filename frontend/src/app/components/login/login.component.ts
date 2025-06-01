import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth-service.service';
import { jwtDecode } from 'jwt-decode';

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
  private authService = inject(AuthService);

  login() {
    this.successMessage = '';
    this.errorMessage = '';

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async userCredential => {
        this.successMessage = '¡Ingreso exitoso!';

        // Obtener el token JWT
        const token = await userCredential.user.getIdToken();

        // Verificar si estamos en el navegador
        if (typeof window !== 'undefined') {
          localStorage.setItem('firebaseToken', token);
        }

        // Decodificar token
        const decoded: any = jwtDecode(token);
        console.log('Token decodificado:', decoded);

        // Extraer el rol desde las posibles ubicaciones del token
        const role = decoded.role || decoded['custom:role'] || decoded['https://yourapp.com/roles'] || null;
        console.log('Rol desde token:', role);

        // Guardar rol en el servicio (este ya verifica el entorno internamente)
        this.authService.setUserRole(role);

        // Redirigir tras 1 segundo
        setTimeout(() => {
          this.router.navigate(['/mascotas']);
        }, 1000);
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
