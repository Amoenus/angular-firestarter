import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PackService } from '../pack.service';
import { Task } from '../pack.model';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.scss']
})
export class PackComponent {
  @Input() pack;

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pack.tasks, event.previousIndex, event.currentIndex);
    this.packService.updateTasks(this.pack.id, this.pack.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, packId: this.pack.id, idx }
        : { task: newTask, isNew: true }
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
