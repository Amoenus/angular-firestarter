import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Pack, Task } from './pack.model';

@Injectable({
  providedIn: 'root'
})
export class PackService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Creates a new pack for the current user
   */
  async createPack(data: Pack) {
    const user = this.afAuth.auth.currentUser;
    return this.db.collection('packs').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }]
    });
  }

  /**
   * Get all packs owned by current user
   */
  getUserPacks() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Pack>('packs', ref =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      // map(packs => packs.sort((a, b) => a.priority - b.priority))
    );
  }

  /**
   * Run a batch write to change the priority of each pack for sorting
   */
  sortPacks(packs: Pack[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = packs.map(b => db.collection('packs').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete pack
   */
  deletePack(packId: string) {
    return this.db
      .collection('packs')
      .doc(packId)
      .delete();
  }

  /**
   * Updates the tasks on pack
   */
  updateTasks(packId: string, tasks: Task[]) {
    return this.db
      .collection('packs')
      .doc(packId)
      .update({ tasks });
  }

  /**
   * Remove a specifc task from the pack
   */
  removeTask(packId: string, task: Task) {
    return this.db
      .collection('packs')
      .doc(packId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }
}
