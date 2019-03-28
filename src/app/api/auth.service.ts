import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { User } from '../shared/user';
import { Observable, Subject } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { takeUntil, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private unsubscribe$ = new Subject();
  private userData = {
    name: '',
    id: '',
  };

  constructor(
    public afAuth: AngularFireAuth,
    public firebase: FirebaseService
  ) { }

  login() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(authUserData => {
        console.log(authUserData);
        this.userData.id = authUserData.user.uid;
        this.userData.name = authUserData.user.displayName;
        this.firebase.getUserData().pipe(
          takeUntil(this.unsubscribe$),
          tap((userData) => {
            if (!userData) {
              this.firebase.addUser({
                name: this.userData.name,
                id: this.userData.id,
              });
            }
          })
        ).subscribe();
      });
  }




  logOut() {
    this.afAuth.auth.signOut();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  authenticated(): Observable<any> {
    return this.afAuth.authState;
  }

}
