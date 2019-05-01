import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
// import { User } from 'firebase';
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
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc(String(trail.id)).set(trail);
  }
  getHasHiked(): Observable<Trail []> {
    return this.db.collection<Trail>(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).valueChanges();
  }
  getHasHikedById(trailID: number): any {
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc(String(trailID)).get().toPromise().then(doc => {
      return doc.exists;
    });
  }
  removeHasHiked(trailID: number): Promise<void> {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc(String(trailID)).delete();
  }

  pushToHike(trail: Trail): void {
    this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toHike`).doc(String(trail.id)).set(trail);
  }
  getToHike(): Observable<Trail[]> {
    return this.db.collection<Trail>(`users/${this.afAuth.auth.currentUser.uid}/toHike`).valueChanges();
  }
  getToHikeById(trailID: number): any {
    // tslint:disable-next-line:max-line-length
    this.db.collection<Trail>(`users/${this.afAuth.auth.currentUser.uid}/toHike`).doc<Trail>(String(trailID)).get().toPromise().then(doc => {
      return doc.exists;
    });
  }
  removeToHike(hikeID: number): Promise<void> {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/toHike`).doc(String(hikeID)).delete();
  }


  getUserTrailRating(trailID: number): Observable<Trail> {
    return this.db.collection(`users/${this.afAuth.auth.currentUser.uid}/hasHiked`).doc<Trail>(`${trailID}`).valueChanges();
  }


  // comment services

  addTrail(trailId, comment: any, userID: string): void {
    this.db.collection(`allComments`).doc(`${trailId.id}`).set(trailId).then(ignoreVar => {
      this.db.collection(`allComments/${trailId.id}/comments`).doc(`${this.afAuth.auth.currentUser.uid}`).set(comment);
    });
  }
  getCommentsFor(trailId: number): Observable<string[]> {
    return this.db.collection<string>(`allComments/${trailId}/comments`).valueChanges();
  }
  getUserComment(trailId: number, userID: string): Observable<string> {
    return this.db.collection<string>(`allComments/${trailId}/comments`).doc<string>(userID).valueChanges();
  }
  updateCommentRating(trailId: number, userID: string, rating: number): void {
    this.db.collection(`allComments/${trailId}/comments`).doc(userID).update({ 'rating': rating });
  }
  deleteCommment(trailId: number, userID: string): void {
    this.db.collection(`allComments/${trailId}/comments`).doc(userID).delete();
  }

}
