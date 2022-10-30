import { Component ,OnInit } from '@angular/core';
import { ReservationService } from '../../shared/reservation/reservation.service';
import { Subscription,Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { reservation } from 'src/app/shared/models/reservation.model';
import { client } from 'src/app/shared/models/client.model';

import {FormGroup, FormControl} from '@angular/forms';
import { ClientService } from '../../shared/client/client.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  clients: client[];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  stateCtrl = new FormControl();
  filteredStates: Observable<client[]>;
  sub!: Subscription;
  reservation: reservation = {
    client: {}
  };

  constructor(private reservationService: ReservationService,
              private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService) { }

  ngOnInit(){
   

    this.sub = this.route.params.subscribe(params => {
    const id = params.id;
    if (id) {
      this.reservationService.get(id).subscribe((reservation: any) => {
        if (reservation) {
          this.reservation = reservation;
          //this.client.href = client._links.self.href;
          //this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
        } else {
          console.log(`Car with id '${id}' not found, returning to list`);
          this.gotoList();
        }
      }); 
    }
    this.clientService.getAll().subscribe(data => {

      this.clients = data;
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(client => client ? this._filterStates(client) : this.clients.slice())
      );
          
      });

  });
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
  private _filterStates(value: string): client[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter(client => client.name.toLowerCase().includes(filterValue));
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
