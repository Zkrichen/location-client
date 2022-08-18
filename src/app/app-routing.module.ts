import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientEditComponent } from './client-edit/client-edit.component';


const routes: Routes = [
 { path: 'client-list', component: ClientListComponent },
 { path: '', component: ClientListComponent },
 {
     path: 'client-add',
     component: ClientEditComponent
   },
   {
     path: 'client-edit/:id',
     component: ClientEditComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
