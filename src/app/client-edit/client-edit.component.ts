import { Component,OnDestroy ,OnInit } from '@angular/core';
import { ClientService } from '../shared/client/client.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { client } from 'src/app/shared/models/client.model';
import {MatInputModule} from '@angular/material/input';

interface Type {
  value: string;
  viewValue: string;
}

interface Profil {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements  OnInit, OnDestroy {
    client: client = {};
     type: Type[] = [
    {value: 'OK', viewValue: 'OK'},
    {value: 'NOK', viewValue: 'NOK'},
    {value: 'VIP', viewValue: 'VIP'},
  ];

  profil: Profil[] = [
    {value: 'famille', viewValue: 'Famille'},
    {value: 'business', viewValue: 'Business'},
    {value: 'jeune', viewValue: 'Jeune'},
    {value: 'couple', viewValue: 'Couple'},
    {value: 'troublant', viewValue: 'Troublant'}

  ];

 

  typeClientContrat: string[] = ['Permanent', 'Saisonnaire'];

sub!: Subscription;

constructor(private route: ActivatedRoute,
            private router: Router,
            private clientService: ClientService) {
}

ngOnInit() {
  this.sub = this.route.params.subscribe(params => {
    const id = params.id;
    if (id) {
      this.clientService.get(id).subscribe((client: any) => {
        if (client) {
          this.client = client;
          //this.client.href = client._links.self.href;
          //this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
        } else {
          console.log(`Car with id '${id}' not found, returning to list`);
          this.gotoList();
        }
      });
    }
  });
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

gotoList() {
  this.router.navigate(['/client-list']);
}

save() {

    this.clientService.save(this.client)
      .subscribe(
        response => {
          console.log(response);
          this.gotoList();
          },
        error => {
          console.log(error);
        });
  }

remove(href: any) {
  this.clientService.remove(href).subscribe(result => {
    this.gotoList();
  }, error => console.error(error));
}
}