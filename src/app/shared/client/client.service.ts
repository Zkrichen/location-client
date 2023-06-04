import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { client } from 'src/app/shared/models/client.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
    API = environment.API_LINK;
    public CLIENT_API = this.API + '/clients';

    constructor(private http: HttpClient) {
    }
    getAll(): Observable<any> {
        return this.http.get(this.API+ '/clients/');
      }
    
    get(id: string) {
        return this.http.get(this.CLIENT_API + '/' + id);
      }

    save( client: client ): Observable<any> {
        let result: Observable<any>;
        if ( client.id ) {
            result = this.http.put(this.CLIENT_API+'/', client );
        } else {
            result = this.http.post(this.CLIENT_API+'/', client );
        }
        return result;
      }

    remove(href: string ) {
        return this.http.delete( href );
      }
}
