import { Component,OnDestroy ,OnInit,ViewChild } from '@angular/core';
import { AppService } from '../../shared/appartement/appartement.service';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Appartement } from 'src/app/shared/models/appartement.model';
import { AppartementEquipement } from 'src/app/shared/models/appartementEquipement.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-appartement-edit',
  templateUrl: './appartement-edit.component.html',
  styleUrls: ['./appartement-edit.component.css']
})
export class AppartementEditComponent implements OnInit {
      
    equipements: any=[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
   appartement: Appartement = {};
   sub!: Subscription;
   dataSource: MatTableDataSource<AppartementEquipement>;
   displayedColumns: string[] = ['id', 'type' ];
  constructor(private route: ActivatedRoute,
            private router: Router,
            private appService: AppService) { }

  ngOnInit(): void {
   this.sub = this.route.params.subscribe(params => {
    const id = params.id;
    if (id) {
      this.appService.get(id).subscribe((appartement: any) => {
        if (appartement) {
          this.appartement = appartement;
          //this.client.href = client._links.self.href;
          //this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
        } else {
          console.log(`Car with id '${id}' not found, returning to list`);
          this.gotoList();
        }
      });
       this.appService.getEquipementByAppart(id).subscribe(data => {
          this.equipements = data;
          this.dataSource = new MatTableDataSource(this.equipements);

          
      });
      
    }
  });
    
  }

  ngOnDestroy() {
  this.sub.unsubscribe();
}

gotoList() {
  this.router.navigate(['/appartement-list']);
}

save() {

    this.appService.save(this.appartement)
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
  this.appService.remove(href).subscribe(result => {
    this.gotoList();
  }, error => console.error(error));
}

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
