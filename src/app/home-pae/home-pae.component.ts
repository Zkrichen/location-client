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
   dataSourceCheckOUT: reservation[]=[];
   dataSourceCheckIN: reservation[]=[];;
   dateOut:Date= new Date();
   dateIn:Date = new Date();



   displayedColumns: string[] = ['id', 'datedebut', 'detefin', 'appartement', 'client', 'paye', 'reste' ];
  constructor(private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    var today= new Date();
    this.reservationService.getCheckOut(today.toISOString()).subscribe(data => {
      console.log(today.toISOString());
      this.resCheckOUT = data;
      this.dataSourceCheckOUT = this.resCheckOUT;
    });
 
    this.reservationService.getCheckIn(today.toISOString()).subscribe(data => {
        this.resCheckIN = data;
        this.dataSourceCheckIN = this.resCheckIN;
    });
  }

  searchCheckOut(){
    console.log(this.dateOut);
    console.log(this.dateOut.getDate());
    console.log(this.dateOut.getFullYear());
    console.log(this.dateOut.getUTCMonth()+1);
    var month: number=0;

    month = this.dateOut.getUTCMonth() + 1;
    console.log(month);

    this.reservationService.getCheckOut(this.dateOut.getFullYear()+"-"+month+"-"+this.dateOut.getDate()).subscribe(data => {
      this.resCheckOUT = data;
      this.dataSourceCheckOUT = this.resCheckOUT;
    });
  }
    
  searchCheckIn(){

    console.log(this.dateIn.getDate());
    console.log(this.dateIn.getFullYear());
    console.log(this.dateIn.getUTCMonth()+1);
    var month: number=0;

    month = this.dateIn.getUTCMonth() + 1;

    this.reservationService.getCheckIn(this.dateIn.getFullYear()+"-"+month+"-"+this.dateIn.getDate()).subscribe(data => {
      this.resCheckIN = data;
      this.dataSourceCheckIN = this.resCheckIN;
    });

  }
}
