import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppService } from '../../shared/appartement/appartement.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Appartement} from '../../shared/models/appartement.model';
@Component({

  selector: 'app-appartement-list',
  templateUrl: './appartement-list.component.html',
  styleUrls: ['./appartement-list.component.css']
})
export class AppartementListComponent implements AfterViewInit {
  appartements: any=[];
   dataSource: MatTableDataSource<Appartement>;
 displayedColumns: string[] = ['id', 'name' ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
  constructor(private appService: AppService) {
      this.appService.getAll().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.appartements = data;
          
      });
      this.dataSource = new MatTableDataSource(this.appartements);
      
      
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
  
  
