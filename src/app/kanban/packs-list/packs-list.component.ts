import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PackDialogComponent } from '../dialogs/pack-dialog.component';
import { Pack } from '../pack.model';
import { PackService } from '../pack.service';

@Component({
  selector: 'app-packs-list',
  templateUrl: './packs-list.component.html',
  styleUrls: ['./packs-list.component.scss']
})
export class PacksListComponent implements OnInit, OnDestroy {

  packs: Pack[];
  sub: Subscription;

  constructor(public packService: PackService, public dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.packService
      .getUserPacks()
      .subscribe(packs => (this.packs = packs));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.packs, event.previousIndex, event.currentIndex);
    this.packService.sortPacks(this.packs);
  }

  openNewPack(): void {
    const dialogRef = this.dialog.open(PackDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.packService.createPack({
          title: result,
          priority: this.packs.length
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
