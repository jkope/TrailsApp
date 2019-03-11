import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../shared/user';
import { Observable } from 'rxjs';
import { Trail } from '../shared/trail';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  addUser(user: User): void {
    this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).set(user);
  }
  getUserData(): Observable<User> {
    return this.db.collection('users').doc<User>(this.afAuth.auth.currentUser.uid).valueChanges();
  }

  pushHasHiked(trail: Trail): void {
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc(String(trail.trailID)).set(trail);
  }
  getHasHiked(): Observable<Trail []> {
    return this.db.collection<Trail>(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).valueChanges();
  }
  getHasHikedById(trailID: number): Observable<Trail> {
    return this.db.collection<Trail>(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc<Trail>(String(trailID)).valueChanges();
  }
  removeHasHiked(trailID: number): Promise<void> {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc(String(trailID)).delete();
  }

  pushToHike(trail: Trail): void {
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toHike`).doc(String(trail.trailID)).set(trail);
  }
  getToHike(): Observable<Trail[]> {
    return this.db.collection<Trail>(`users/${this.afAuth.auth.currentUser.uid}/toHike`).valueChanges();
  }
  getToHikeById(trailID: number): Observable<Trail> {
    return this.db.collection<Trail>(`users/${this.afAuth.auth.currentUser.uid}/toHike`).doc<Trail>(String(trailID)).valueChanges();
  }
  removeToHike(hikeID: number): Promise<void> {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toHike`).doc(String(hikeID)).delete();
  }


  getUserTrailRating(trailID: number): Observable<Trail> {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc<Trail>(`${trailID}`).valueChanges();
  }

}
