import { Component, OnInit } from '@angular/core';
import {AuthService} from "../api/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.auth.login().then(_ => {
      this.router.navigate(['search']);
    })
  }

}
