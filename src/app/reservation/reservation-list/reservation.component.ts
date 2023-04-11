import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ReservationService } from '../../shared/reservation/reservation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {reservation} from '../../shared/models/reservation.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements  AfterViewInit {
  reservations: any=[];
  dataSource: MatTableDataSource<reservation>;
  displayedColumns: string[] = ['id', 'datedebut', 'detefin', 'appartement', 'client', 'typereservation', 'casse', 'bruit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    
  constructor(private resService: ReservationService) {
      
    
  }
  
     // this.dataSource = new MatTableDataSource(this.reservations);

  
  ngAfterViewInit() {
       this.resService.getAll().subscribe(data => {
       this.dataSource = new MatTableDataSource<reservation>(data);
       this.reservations = data;   
       this.dataSource.paginator = this.paginator;
       this.dataSource.filterPredicate = (data: reservation, filter: string) => {
        return data.appratement.name.toLocaleLowerCase().includes(filter);
      }

        this.dataSource.filterPredicate = (data: reservation, filter: string) => {  
        return data.client.name.toLocaleLowerCase().includes(filter);
      }
      this.dataSource.sort = this.sort;     
      });

     
     
    }
  
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }