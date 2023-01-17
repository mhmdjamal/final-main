import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Startup } from '../interfaces/startups.interface';
@Injectable({
  providedIn: 'root'
})
export class StartupsService {
  dbPath = '/startups';
  dbRef: AngularFireList<Startup>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.dbRef = angularFireDatabase.list(this.dbPath);
  }

  create(data: Startup) {
    return this.dbRef.push(data);
  }
  createRequest(data: Startup) {
    return this.angularFireDatabase.list('/requsetStartup').push(data);
  }
  update(key: string, data: Startup) {
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

  getByIdRequests(key: string) {
    this.dbPath = '/requsetStartup';
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
      .list<Startup>('/requsetStartup')
      .snapshotChanges()
      .pipe(
        map(data =>
          data.map(obj => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }

  deleteRequsted(key: string | undefined) {
    return this.angularFireDatabase
      .list<Startup>('/requsetStartup')
      .remove(key);
  }
}
