import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { NB_MEDIA_BREAKPOINTS, NB_THEME_OPTIONS, NbMenuModule, NbSidebarModule, NbStatusService, NbThemeModule, NbThemeOptions, NbThemeService, NbToastrModule } from '@nebular/theme';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([NbThemeModule.forRoot({ name: 'default' })]),
    importProvidersFrom([NbSidebarModule.forRoot()]),
    importProvidersFrom([NbMenuModule.forRoot()]),
    importProvidersFrom([NbToastrModule.forRoot()]),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  
};
