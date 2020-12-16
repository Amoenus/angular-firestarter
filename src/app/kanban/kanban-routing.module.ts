import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacksListComponent } from './packs-list/packs-list.component';


const routes: Routes = [
  { path: '', component: PacksListComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }

