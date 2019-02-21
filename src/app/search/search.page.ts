import { Component, OnInit } from '@angular/core';
import { TrailsApiService } from '../api/trails-api.service';
import { AuthService } from '../api/auth.service';
import {Router} from "@angular/router";

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
    private auth: AuthService,
    private router: Router,
    private trailsApi: TrailsApiService,
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
    // this.trails$ = this.trails.getTrails(40.3769, -111.789);
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   console.log(resp.coords.latitude);
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    navigator.geolocation.getCurrentPosition(data =>{
      console.log(data.coords.latitude, data.coords.longitude);
      this.trails$ = this.trailsApi.getTrails(data.coords.latitude, data.coords.longitude);
      // this.router.navigate(['trail', 123, 'details']);
    }, error => {
      console.log(error);
    })

  }

  goToTrail(id){
      this.router.navigate(['trail', id, 'details']);
  }




}
