import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PoolItem } from '../kanban/pool-item.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-packs-list2-component',
  templateUrl: './packs-list2-component.component.html',
  styleUrls: ['./packs-list2-component.component.scss'],
})
export class PacksList2Component implements OnInit {
  public parentItem: PoolItem;
  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.getIdsRecursive(this.parentItem).reverse();
  }

  constructor() {
    this.parentItem = { id: uuid.v4(), description: 'parent-item', label: 'purple', poolItems: [], rate: 0.25 };
  }

  public ngOnInit() {
    this.parentItem.poolItems.push({
      id: uuid.v4(),
      description: 'test1',
      label: 'green',
      rate: 0.25,
      poolItems: [
        { id: uuid.v4(), description: 'subItem1', label: 'purple', poolItems: [], rate: 0.25 },
        { id: uuid.v4(), description: 'subItem2', label: 'yellow', poolItems: [], rate: 0.25, pityRate: 0.12},
        { id: uuid.v4(), description: 'subItem3', label: 'green', poolItems: [], rate: 0.25 },
      ],
    });
    this.parentItem.poolItems.push({
      id: uuid.v4(),
      description: 'test2',
      label: 'yellow',
      rate: 0.25,
      poolItems: [
        { id: uuid.v4(), description: 'subItem4', label: 'purple', poolItems: [], rate: 0.25 },
        { id: uuid.v4(), description: 'subItem5', label: 'yellow', poolItems: [], rate: 0.25, pityRate: 0.12 },
        {
          id: uuid.v4(),
          description: 'subItem6',
          label: 'green',
          rate: 0.25,
          poolItems: [{ id: uuid.v4(), description: 'subItem8', label: 'purple', poolItems: [], rate: 0.25 }],
        },
      ],
    });
    this.parentItem.poolItems.push({ id: uuid.v4(), description: 'test3', label: 'yellow', poolItems: [], rate: 0.25, pityRate: 0.12 });
  }

  public onDragDrop(event: CdkDragDrop<PoolItem>) {
    event.container.element.nativeElement.classList.remove('active');
    if (this.canBeDropped(event)) {
      const movingItem: PoolItem = event.item.data;
      event.container.data.poolItems.push(movingItem);
      event.previousContainer.data.poolItems = event.previousContainer.data.poolItems.filter(
        (child) => child.id !== movingItem.id
      );
    } else {
      moveItemInArray(
        event.container.data.poolItems,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getIdsRecursive(item: PoolItem): string[] {
    let ids = [item.id];
    item.poolItems.forEach((childItem) => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<PoolItem, PoolItem>): boolean {
    const movingItem: PoolItem = event.item.data;

    return (
      event.previousContainer.id !== event.container.id &&
      this.isNotSelfDrop(event) &&
      !this.hasChild(movingItem, event.container.data)
    );
  }

  private isNotSelfDrop(
    event: CdkDragDrop<PoolItem> | CdkDragEnter<PoolItem> | CdkDragExit<PoolItem>
  ): boolean {
    return event.container.data.id !== event.item.data.uId;
  }

  private hasChild(parentItem: PoolItem, childItem: PoolItem): boolean {
    const hasChild = parentItem.poolItems.some(
      (item: PoolItem) => item.id === childItem.id
    );
    return hasChild
      ? true
      : parentItem.poolItems.some((item: PoolItem) => this.hasChild(item, childItem));
  }
}
