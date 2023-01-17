import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Sectors } from '../interfaces/sector.interface';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  dbPath = '/sectors';
  dbRef: AngularFireList<Sectors>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.dbRef = angularFireDatabase.list(this.dbPath);
  }

  create(data: Sectors) {
    return this.dbRef.push(data);
  }

  createRequest(data: Sectors) {
    return this.angularFireDatabase.list('/requsetSectors').push(data);
  }

  update(key: string, data: Sectors) {
    return this.dbRef.update(key, data);
  }

  delete(key: string | undefined) {
    return this.dbRef.remove(key);
  }

  deleteAll() {
    return this.dbRef.remove();
  }

  getById(key: string) {
    return this.angularFireDatabase
      .object(`${this.dbPath}/${key}`)
      .valueChanges();
  }

  getAll(): Observable<any> {
    return this.dbRef
      .snapshotChanges()
      .pipe(
        map(data =>
          data.map(obj => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }

  getAllRequsted(): Observable<any> {
    return this.angularFireDatabase
      .list<Sectors>('/requsetSectors')
      .snapshotChanges()
      .pipe(
        map(data =>
          data.map(obj => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }

  deleteRequsted(key: string | undefined) {
    return this.angularFireDatabase
      .list<Sectors>('/requsetSectors')
      .remove(key);
  }
}
