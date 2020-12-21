import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { PacksListComponent } from './packs-list/packs-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PackComponent } from './pack/pack.component';
import { FormsModule } from '@angular/forms';
import { PackDialogComponent } from './dialogs/pack-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskDialogComponent } from './dialogs/task-dialog.component';
import { PacksList2Component } from '../packs-list2-component/packs-list2-component.component';

@NgModule({
  declarations: [
    PacksListComponent,
    PackComponent,
    PackDialogComponent,
    TaskDialogComponent,
    PacksList2Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    KanbanRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [PackDialogComponent, PacksList2Component, TaskDialogComponent]
})
export class KanbanModule {}
