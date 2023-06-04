import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservation } from 'src/app/shared/models/reservation.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  API = environment.API_LINK;

  public RES_API = this.API + '/reservations';


  constructor(private http: HttpClient) {
  }

 getAll(): Observable<any> {
        return this.http.get(this.RES_API+'/'+'?field=id');
      }
 getCheckIn(): Observable<any> {
        return this.http.get(this.RES_API+'/'+'checkIn');
      }

 getCheckOut(): Observable<any> {
        return this.http.get(this.RES_API+'/'+'checkOut');
      }
 get(id: string) {
        return this.http.get(this.RES_API + '/' + id);
      }

 save( res: reservation ): Observable<any> {
        let result: Observable<any>;
        if ( res.id ) {
            result = this.http.put(this.RES_API+'/', res );
        } else {
            result = this.http.post(this.RES_API+'/', res );
        }
        return result;
      }
  remove(href: string ) {
        return this.http.delete( href );
  }

}
