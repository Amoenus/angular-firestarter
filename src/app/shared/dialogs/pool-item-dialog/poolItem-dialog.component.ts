import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PoolItem} from '../../../kanban/pool-item.model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './poolItem-dialog.component.html',
  styleUrls: ['../dialog.scss']
})
export class PoolItemDialogComponent {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    public dialogRef: MatDialogRef<PoolItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { poolItem: PoolItem, isNew: boolean, idx?: number }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.dialogRef.close();
  }
}
