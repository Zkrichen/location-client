import { Component ,OnInit } from '@angular/core';
import { ReservationService } from '../../shared/reservation/reservation.service';
import { AppService } from '../../shared/appartement/appartement.service';

import { Subscription,Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { reservation } from 'src/app/shared/models/reservation.model';
import { client } from 'src/app/shared/models/client.model';
import { Appartement } from 'src/app/shared/models/appartement.model';


import {FormGroup, FormControl} from '@angular/forms';
import { ClientService } from '../../shared/client/client.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
 public clients: client[]=[];
 public apartements: Appartement[]=[];
 public total:any=0;
 public reste:any=0;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  stateCtrl = new FormControl();
  appratementsCtrl = new FormControl();

  filteredStates: Observable<client[]>;
  appratementsStates: Observable<Appartement[]>;

  sub!: Subscription;
  reservation: reservation = {
    client: {},
    appratement :{}
  };

  constructor(private reservationService: ReservationService,
              private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService,
              private appService: AppService
              ) { }

  ngOnInit(){
   

    this.sub = this.route.params.subscribe(params => {
    const id = params.id;
    if (id) {
      this.reservationService.get(id).subscribe((reservation: any) => {
        if (reservation) {
          this.reservation = reservation;
          //this.client.href = client._links.self.href;
          //this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          this.total=this.reservation.prixparnuite*(this.reservation.nombredenuite-this.reservation.nombrenuitgratuit)-this.reservation.reduction;
        } else {
          console.log(`Car with id '${id}' not found, returning to list`);
          this
          .gotoList();
        }
      }); 
    }
    this.clientService.getAll().subscribe(data => {
      this.clients = data;
      });

    this.appService.getAll().subscribe(data => {
      this.apartements = data;
      });

  });

  this.filteredStates = this.stateCtrl.valueChanges.pipe(
    startWith(''),
    map(state => state ? this._filterStates(state) : this.clients.slice())
  
  );

  this.appratementsStates = this.appratementsCtrl.valueChanges.pipe(
    startWith(''),
    map(state => state ? this._appartementFilterStates(state) : this.apartements.slice())
  
  );

  }

  displayFn(client: client): string {
    return client && client.name ? client.name+' - '+client.tel1 : '';
  }
  displayApp(appartement: Appartement): string {
    return appartement && appartement.name ? appartement.name+" - "+appartement.batiment : '';
  }
  save() {

    this.reservationService.save(this.reservation)
      .subscribe(
        response => {
          console.log(response);
          this.gotoList();

        },
        error => {
          console.log(error);
        });
  }
   _filterStates(value: string): client[] {
    const filterValue =  typeof value === 'string' ? value.toLowerCase():'';
    return this.clients.filter(client => client.name.toLowerCase().includes(filterValue));
  }

  _appartementFilterStates(value: string): Appartement[] {
    const filterValue =  typeof value === 'string' ? value.toLowerCase():'';
    return this.apartements.filter(app => app.name.toLowerCase().includes(filterValue));
  }
  gotoList() {
  this.router.navigate(['/reservation-list']);
} 
    ngOnDestroy() {
  this.sub.unsubscribe();
}

remove(href: any) {
  this.reservationService.remove(href).subscribe(result => {
    this.gotoList();
  }, error => console.error(error));
}

}
