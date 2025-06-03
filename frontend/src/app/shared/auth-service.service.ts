import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  // Estado del rol del usuario
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  // Estado de si el usuario está logueado
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const role = localStorage.getItem('userRole');
      this.userRoleSubject.next(role);
      this.isLoggedInSubject.next(!!role); // true si hay un rol guardado
    }
  }

  // Guardar o eliminar el rol del usuario
  setUserRole(role: string | null): void {
    if (this.isBrowser) {
      if (role) {
        localStorage.setItem('userRole', role);
      } else {
        localStorage.removeItem('userRole');
      }
    }

    this.userRoleSubject.next(role);
    this.isLoggedInSubject.next(!!role);
  }

  // Obtener el rol actual directamente
  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  // Saber si el rol es admin
  isAdmin(): boolean {
    return this.userRoleSubject.value === 'admin';
  }

  // Saber si alguien está logueado
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
