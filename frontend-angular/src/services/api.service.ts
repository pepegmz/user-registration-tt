import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { catchError, Observable } from 'rxjs';

const serverUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  logicalPositions = NbGlobalLogicalPosition;
  physicalPositions = NbGlobalPhysicalPosition;

  config =  {
    status: 'danger',
    position: this.physicalPositions.BOTTOM_RIGHT,
    preventDuplicates: true,
    icon: 'close-circle-outline'
  }

  toastService = inject(NbToastrService);
  httpClient = inject(HttpClient);

  login(userData: any): Observable<any> {
    return this.httpClient.post(`${serverUrl}/users`, userData).pipe(
      catchError((error) => {
        this.toastService.danger('Error de comunicacion con el servidor', 'Error', this.config);
        return error;
      })
    );
  }

}
