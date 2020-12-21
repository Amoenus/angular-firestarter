import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacksList2Component } from '../packs-list2-component/packs-list2-component.component';
import { PacksListComponent } from './packs-list/packs-list.component';


const routes: Routes = [
  { path: '', component: PacksList2Component }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }

