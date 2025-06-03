import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascotaModel } from '../../../shared/models/mascota.model';
import { RefugioModel } from '../../../shared/models/refugio.model';
import { MascotaService } from '../../../shared/services/mascota.service';
import { RefugioService } from '../../../shared/services/refugio.service';
import { NotificacionService } from '../../../shared/notificacion.service';
import { AuthService } from '../../../shared/auth-service.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-mascota',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './add-mascota.component.html',
  styleUrls: ['./add-mascota.component.css']
})
export class AddMascotaComponent implements OnInit {
  opcion: string = '';
  id: string = '';
  refugioSeleccionado: string = '';
  refugios: Observable<RefugioModel[]> | undefined;
  btnEnvEdit = {
    mensaje: '',
    class: '',
    icon: ''
  };
  public isAdmin = false;
  mascota = new MascotaModel('', '', '', '', '', '', '', '', '');
  refugio = new RefugioModel('', '', '', '', '');
  imagePreview: string | SafeUrl | null = null;
  imageError: boolean = false;

  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    private router: Router,
    private refugioService: RefugioService,
    private notiService: NotificacionService,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'admin';
    });
    console.log(`la ruta actual es: ${this.route}`);
    this.id = this.route.snapshot.params['id'];
    console.log(`El id de mascota es ${this.id}`);
    this.refugios = this.refugioService.obtenerRefugios();

    if (this.id) {
      // Edit mode
      this.opcion = 'Editar Mascota';
      this.btnEnvEdit.mensaje = 'Actualizar datos';
      this.btnEnvEdit.class = 'btn btn-primary flex-grow-1 me-2 hover-btn';
      this.btnEnvEdit.icon = 'bi bi-pencil-square';
      this.mascotaService.obtenerMascota(this.id).subscribe({
        next: (data: MascotaModel) => {
          console.log(data);
          this.mascota = data;
          this.refugioSeleccionado = data.id_refugio; // Set refugio from mascota
          this.onImageUrlChange(); // Initialize image preview
        },
        error: err => {
          console.log(`Error ${err}`);
          this.notiService.mostrar('error', 'Error al cargar los datos de la mascota');
        }
      });
    } else {
      // Add mode
      this.opcion = 'Agregar una nueva Mascota';
      this.btnEnvEdit.mensaje = 'Enviar datos';
      this.btnEnvEdit.class = 'btn btn-success flex-grow-1 me-2 hover-btn';
      this.btnEnvEdit.icon = 'bi bi-send-check';
    }
  }

  onImageUrlChange() {
    this.imageError = false;
    this.imagePreview = this.mascota.imagen ? this.sanitizer.bypassSecurityTrustUrl(this.mascota.imagen) : null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.imageError = false;
      // Optionally upload the file to your server
      this.uploadFile(file).subscribe({
        next: (url: string) => {
          this.mascota.imagen = url; // Update mascota.imagen with the uploaded URL
          this.onImageUrlChange();
        },
        error: (err) => {
          console.log(`Error uploading file: ${err}`);
          this.imageError = true;
          this.notiService.mostrar('error', 'Error al subir la imagen');
        }
      });
    }
  }

  onImageError() {
    this.imageError = true;
    this.imagePreview = null;
    this.notiService.mostrar('error', 'No se pudo cargar la imagen. Verifica la URL o el archivo.');
  }

  // Mock file upload method (replace with your actual service)
  private uploadFile(file: File): Observable<string> {
    // Implement your file upload logic here, e.g., to Firebase, AWS S3, or your backend
    // Return an Observable that emits the uploaded file's URL
    return new Observable(observer => {
      // Example: Simulate upload
      setTimeout(() => {
        observer.next('https://example.com/uploaded-image.jpg'); // Replace with actual URL
        observer.complete();
      }, 1000);
    });
  }

  onSubmit() {
    if (this.imageError) {
      this.notiService.mostrar('error', 'Por favor, corrige la imagen antes de enviar.');
      return;
    }

    if (this.mascota.id) {
      // Update existing pet
      this.mascota.id_refugio = this.refugioSeleccionado;
      this.mascotaService.actualizarMascota(this.mascota).subscribe({
        next: data => {
          this.router.navigate(['/mascotas']);
          this.notiService.mostrar(data.type, data.mensaje);
        },
        error: err => {
          console.log(`Error al actualizar ${err}`);
          this.notiService.mostrar('error', 'Error al actualizar la mascota');
        }
      });
    } else {
      // Add new pet
      this.mascota.estado_adopcion = 'no adoptado';
      this.mascota.id_refugio = this.refugioSeleccionado;
      this.mascotaService.agregarMascotas(this.mascota).subscribe({
        next: data => {
          this.router.navigate(['/mascotas']);
          this.notiService.mostrar(data.type, data.mensaje);
        },
        error: err => {
          console.log(`Error al agregar ${err}`);
          this.notiService.mostrar('error', 'Error al agregar la mascota');
        }
      });
    }
  }
}