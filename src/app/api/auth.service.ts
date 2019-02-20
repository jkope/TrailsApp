import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  login() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  authenticated(): Observable<User> {
    return this.afAuth.authState;
  }
}
