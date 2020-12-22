import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PackService } from '../pack.service';
import { Pack } from '../pack.model';
import { PoolItem } from '../pool-item.model';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.scss']
})
export class PackComponent {
  @Input() pack: Pack;
  @Input() connectedTo = [];

  taskDrop(event: CdkDragDrop<PoolItem[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(this.pack.tasks, event.previousIndex, event.currentIndex);
      this.packService.updateTasks(this.pack.id, this.pack.tasks);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      this.packService.updateTasks(this.pack.id, this.pack.tasks);
      this.packService.updateTasks(event.container.connectedTo.toString(), event.previousContainer.data);
    }
  }

  openDialog(task?: PoolItem, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { poolItem: { ...task }, isNew: false, packId: this.pack.id, idx }
        : { poolItem: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.packService.updateTasks(this.pack.id, [
            ...this.pack.tasks,
            result.task
          ]);
        } else {
          const update = this.pack.tasks;
          update.splice(result.idx, 1, result.task);
          this.packService.updateTasks(this.pack.id, this.pack.tasks);
        }
      }
    });
  }

  handleDelete() {
    this.packService.deletePack(this.pack.id);
  }

  constructor(private packService: PackService, private dialog: MatDialog) {}
}
