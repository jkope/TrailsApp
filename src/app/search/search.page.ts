import { Component, OnInit } from '@angular/core';
import { TrailsApiService } from '../api/trails-api.service';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
 private trails$;
 private user$;

  constructor(
    private trails: TrailsApiService,
    private auth: AuthService
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

  trailsByGeoLoc() {
    // get user current lat and lon and use in the line below
    this.trails$ = this.trails.getTrails(40.3769, -111.789);

  }




}
