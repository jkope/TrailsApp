import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { FirebaseService } from '../api/firebase.service';
import { Trail } from '../shared/trail';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
private user$;
private hiked$: Observable <Trail[]>;
private toHike$: Observable <Trail[]>;

  constructor(
    private auth: AuthService,
    private firebase: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user$ = this.auth.authenticated();
    this.hiked$ = this.firebase.getHasHiked();
    this.toHike$ = this.firebase.getToHike();
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

  goToTrail(id) {
    this.router.navigate(['trail', id, 'details']);
  }
}
