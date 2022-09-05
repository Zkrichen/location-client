import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClientService } from '../shared/client/client.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {client} from '../shared/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements AfterViewInit {
  clients: any=[];
   dataSource: MatTableDataSource<client>;
displayedColumns: string[] = ['id', 'name', 'cin', 'tel1', 'typeclient' ];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
  constructor(private clientService: ClientService) {
      this.clientService.getAll().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.clients = data;
          
      });
      this.dataSource = new MatTableDataSource(this.clients);
      
      
  }

//  ngOnInit() {
//      this.clientService.getAll().subscribe(data => {
//          this.dataSource = new MatTableDataSource(data);
//          this.clients = data;
//          
//      });
//}
  
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  
  

