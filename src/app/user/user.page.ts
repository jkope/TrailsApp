import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
private user$;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.user$ = this.auth.authenticated();
  }

  login() {
    this.auth.login();
  }

  logOut() {
    this.auth.logOut();
  }


}
