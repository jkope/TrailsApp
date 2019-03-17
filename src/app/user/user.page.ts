import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { FirebaseService } from '../api/firebase.service';
import { Trail } from '../shared/trail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
private user$;
private hiked$: Observable <Trail[]>;

  constructor(
    private auth: AuthService,
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
    this.user$ = this.auth.authenticated();
    this.hiked$ = this.firebase.getHasHiked();
    this.firebase.getHasHiked().subscribe(x => {
      console.log(x);
    });
  }

  login() {
    this.auth.login();
  }

  logOut() {
    this.auth.logOut();
  }


}
