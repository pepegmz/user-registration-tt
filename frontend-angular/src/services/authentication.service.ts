import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiService = inject(ApiService);

  register(userData: any) {
    return this.apiService.login(userData);
  }

}
