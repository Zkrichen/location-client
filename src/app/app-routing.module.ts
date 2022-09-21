import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AppartementListComponent } from './appartement/appartement-list/appartement-list.component';

import { AppartementEditComponent } from './appartement/appartement-edit/appartement-edit.component';

import { ClientEditComponent } from './client-edit/client-edit.component';
import { ReservationComponent } from './reservation/reservation-list/reservation.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';

const routes: Routes = [
 { path: 'appartement-list', component: AppartementListComponent },
 { path: 'appartement-add', component: AppartementEditComponent },
 { path: 'appartement-edit/:id', component: AppartementEditComponent },

 { path: 'client-list', component: ClientListComponent },
 { path: '', component: ClientListComponent },
 { path: 'client-add', component: ClientEditComponent},
 { path: 'client-edit/:id',component: ClientEditComponent},
 { path: 'reservation-list', component: ReservationComponent },
 { path: 'reservation-edit/:id', component: ReservationEditComponent },
 { path: 'reservation-add', component: ReservationEditComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
