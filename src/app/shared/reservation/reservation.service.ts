import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservation } from 'src/app/shared/models/reservation.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

   public API = '//localhost:8080';
    public RES_API = this.API + '/reservations/';


    constructor(private http: HttpClient) {
    }

 getAll(): Observable<any> {
        return this.http.get(this.RES_API+'?field=datefin');
      }


}
