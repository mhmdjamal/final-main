import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList
} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dbPath = '/users';
  dbRef: AngularFireList<any>;
  userInfo = new BehaviorSubject<any>({});
  userId: string = '';
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('userId'));
  roleAs: string | null = '';

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router
  ) {
    this.dbRef = angularFireDatabase.list(this.dbPath);
    this.authStateSubscripe();
  }
  get isLoggedIn() {
    return this.isLoggedIn$.getValue();
  }
  login(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          window.alert(error.message);
        })
    );
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

  getRole() {
    localStorage.removeItem('role');
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }

  signup(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          window.alert(error.message);
        })
    );
  }
  createUser(userId: string, name: string, email: string): Observable<any> {
    this.userId = userId;
    return from(
      this.dbRef.update(userId, {
        userId: userId,
        name: name,
        email: email,
        role: 'enduser'
      })
    );
  }

  getUserInfo() {
    this.userInfo.subscribe(user => {
      localStorage.setItem('role', user.role);
    });
  }

  authStateSubscripe() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        if (!this.isLoggedIn) {
          this.router.navigate(['/startup/all-startup']);
        }
        this.getUserById(user.uid);
        localStorage.setItem('userId', user.uid);
        this.getUserInfo();
        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('userId');
        this.isLoggedIn$.next(false);
      }
    });
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('userId');
      this.isLoggedIn$.next(false);
      console.log(this.isLoggedIn$);

      location.reload();
    });
  }

  getUserById(userId: string) {
    this.angularFireDatabase
      .object(`${this.dbPath}/${userId}`)
      .valueChanges()
      .subscribe(user => {
        this.userInfo.next(user);
      });
  }
}
