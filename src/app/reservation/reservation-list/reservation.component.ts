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
import { ClientService } from '../../shared/client/client.service';
import { client } from 'src/app/shared/models/client.model';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements  AfterViewInit {
  reservations: reservation[]=[];
  dataSource: MatTableDataSource<reservation>;
  displayedColumns: string[] = ['id', 'datedebut', 'detefin', 'appartement', 'client', 'typereservation', 'casse', 'bruit'];
  public apartements: Appartement[]=[];
  appratementsStates: Observable<Appartement[]>;
  appratement: Appartement;
  appratementsCtrl = new FormControl();
  public clients: client[]=[];
  client: client;
  filteredStates: Observable<client[]>;
  stateCtrl = new FormControl();
  dateRes: Date;





  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    
  constructor(private resService: ReservationService,  private appService: AppService,       
           private clientService: ClientService
    ) {
      
    
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

        this.clientService.getAll().subscribe(data => {
          this.clients = data;
          });

        this.appratementsStates = this.appratementsCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this._appartementFilterStates(state) : this.apartements.slice())
        
        );
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.clients.slice())
        
        );
    }
    searchInReservation(){

      var resToSearch: reservation[]=[];
      if(this.appratement!=null){
        for (let res of this.reservations) {
          if (res.appratement.id === this.appratement.id  ) {
            console.log("id res found " +res.id);
            resToSearch.push(res)

          }
          
       }
      }

      if(this.client!=null){
        if(resToSearch.length>1){
          var listToCompleateSeearch= resToSearch;
          resToSearch=[];
        }else{
          listToCompleateSeearch=this.reservations;
        }

        for (let res of listToCompleateSeearch) {
          if (res.client.id === this.client.id  ) {
            console.log("id res found " +res.id);
            resToSearch.push(res)

          }
          
       }
      }
      if(this.dateRes!=null){
        if(resToSearch.length>1){
          var listToCompleateSeearch= resToSearch;
          resToSearch=[];
        }else{
          listToCompleateSeearch=this.reservations;
        }
        for (let res of listToCompleateSeearch) {
          var month2 = this.padTo2Digits(this.dateRes.getMonth() + 1);
          var selectedDate=this.dateRes.getFullYear()+"-"+month2+"-"+this.dateRes.getDate()
          if (  res.datedebut.toLocaleString()<=selectedDate&&res.datefin.toLocaleString()>=selectedDate ) {
            console.log("id res found " +res.id);
            resToSearch.push(res)

          }
       }
      }
    
      this.dataSource = new MatTableDataSource<reservation>(resToSearch);
        }

       padTo2Digits(num: number) {
          return num.toString().padStart(2, '0');
        }
    clear(){
      this.dataSource = new MatTableDataSource<reservation>(this.reservations);
      this.client=null;
      this.appratement=null;
      this.dateRes=null;

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

    displayFn(client: client): string {
      return client && client.name ? client.name+' - '+client.tel1 : '';
    }

    _filterStates(value: string): client[] {
      const filterValue =  typeof value === 'string' ? value.toLowerCase():'';
      return this.clients.filter(client => client.name.toLowerCase().includes(filterValue));
    }

  }