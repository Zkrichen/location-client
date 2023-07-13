import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ReservationService } from '../../shared/reservation/reservation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {reservation} from '../../shared/models/reservation.model';
import { Appartement } from 'src/app/shared/models/appartement.model';
import { Observable } from 'rxjs';
import { FormControl} from '@angular/forms';
import { AppService } from '../../shared/appartement/appartement.service';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements  AfterViewInit {
  reservations: any=[];
  dataSource: MatTableDataSource<reservation>;
  displayedColumns: string[] = ['id', 'datedebut', 'detefin', 'appartement', 'client', 'typereservation', 'casse', 'bruit'];
  public apartements: Appartement[]=[];
  appratementsStates: Observable<Appartement[]>;
  appratement: Appartement;
  appratementsCtrl = new FormControl();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    
  constructor(private resService: ReservationService,  private appService: AppService) {
      
    
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

      this.appService.getAll().subscribe(data => {
        this.apartements = data;
        });

        this.appratementsStates = this.appratementsCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this._appartementFilterStates(state) : this.apartements.slice())
        
        );
     
    }
    searchInReservation(){
      var resToSearch: reservation[]=[];
      if(this.appratement!=null){
        for (let res of this.reservations) {
          if (res.appratement.id === this.appratement.id  ) {
            resToSearch.push(res)

          }
          
       }
      }

    
      this.dataSource = new MatTableDataSource<reservation>(resToSearch);
        }
    _appartementFilterStates(value: string): Appartement[] {
      const filterValue =  typeof value === 'string' ? value.toLowerCase():'';
      return this.apartements.filter(app => app.name.toLowerCase().includes(filterValue));
    }
  
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    displayApp(appartement: Appartement): string {
      return appartement && appartement.name ? appartement.name+" - "+appartement.batiment : '';
    }

  }