import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation/reservation.service';
import { Subscription,Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { reservation } from 'src/app/shared/models/reservation.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-home-pae',
  templateUrl: './home-pae.component.html',
  styleUrls: ['./home-pae.component.css']
})
export class HomePaeComponent implements OnInit {
   resCheckOUT: reservation[]=[];
   resCheckIN: reservation[]=[];
   dataSourceCheckOUT: reservation[]=[];;

   displayedColumns: string[] = ['id', 'datedebut', 'detefin', 'appartement', 'client', 'paye', 'reste' ];
  constructor(private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.reservationService.getCheckOut().subscribe(data => {
      this.resCheckOUT = data;
      this.dataSourceCheckOUT = this.resCheckOUT;
    });

    this.reservationService.getCheckIn().subscribe(data => {
        this.resCheckIN = data;
    });
  }

}
