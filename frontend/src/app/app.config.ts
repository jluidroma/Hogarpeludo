import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimización de detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Configuración del router
    provideRouter(routes),
    
    // Soporte para hydration (SSR)
    provideClientHydration(),
    
    // Configuración de HttpClient con Fetch API
    provideHttpClient(withFetch())
  ]
};