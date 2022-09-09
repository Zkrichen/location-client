import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appartement } from 'src/app/shared/models/appartement.model';


@Injectable({
  providedIn: 'root'
})
export class AppService {
    public API = '//localhost:8080';
    public APP_API = this.API + '/appartements';
    public EQUI_API = this.API + '/equipements';


    constructor(private http: HttpClient) {
    }
    getAll(): Observable<any> {
        return this.http.get(this.API+ '/appartements/');
      }

   
    
    get(id: string) {
        return this.http.get(this.APP_API + '/' + id);
      }

      getEquipementByAppart(id: string) {
        return this.http.get(this.EQUI_API + '/' + id);
      }

    save( app: Appartement ): Observable<any> {
        let result: Observable<any>;
        if ( app.id ) {
            result = this.http.put(this.APP_API+'/', app );
        } else {
            result = this.http.post(this.APP_API+'/', app );
        }
        return result;
      }

    remove(href: string ) {
        return this.http.delete( href );
      }
}
