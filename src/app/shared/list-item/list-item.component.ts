import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PoolItem } from 'src/app/kanban/pool-item.model';
import { PoolItemDialogComponent } from '../dialogs/pool-item-dialog/poolItem-dialog.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item: PoolItem;
  @Input() parentItem?: PoolItem;
  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }
  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds.filter((id) => id !== this.item.id);
  }
  public allDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem.id;
  }


  @Output() itemDrop: EventEmitter<CdkDragDrop<PoolItem>>

  constructor(public dialog: MatDialog) {
    this.allDropListsIds = [];
    this.itemDrop = new EventEmitter();
  }

  public onDragDrop(event: CdkDragDrop<PoolItem, PoolItem>): void {
    this.itemDrop.emit(event);
  }

  openDialog(task?: PoolItem, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(PoolItemDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          // TODO: Add new
        } else {
          // TODO: Update
        }
      }
    });

  }
}
