import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public isAdmin = false;
  dropdownVisible = false;
  constructor(public authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'admin';
    });
  }
  toggleDropdown() {
  this.dropdownVisible = !this.dropdownVisible;
  }
  cerrarsesion() {

  this.authService.logout();
  }
 
}