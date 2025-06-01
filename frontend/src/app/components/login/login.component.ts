import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router'; // Agrega RouterModule
import { AuthService } from '../../shared/auth-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Agrega RouterModule para routerLink
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false; // Para mostrar/ocultar contraseña
  loading: boolean = false; // Para el estado de carga

  private auth = inject(Auth);
  private router = inject(Router);
  private authService = inject(AuthService);

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true; // Activar estado de carga

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

        // Guardar rol en el servicio
        this.authService.setUserRole(role);

        // Redirigir tras 1 segundo
        setTimeout(() => {
          this.loading = false; // Desactivar estado de carga
          this.router.navigate(['/mascotas']);
        }, 1000);
      })
      .catch(error => {
        this.loading = false; // Desactivar estado de carga
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