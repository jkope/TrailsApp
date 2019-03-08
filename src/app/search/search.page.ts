import { Component, OnInit } from '@angular/core';
import { TrailsApiService } from '../api/trails-api.service';
import { AuthService } from '../api/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {MapquestService} from '../api/mapquest.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
 private trails$;
 private user$;
 zipcode;

  constructor(
    private trails: TrailsApiService,
    private auth: AuthService,
    private router: Router,
    private trailsApi: TrailsApiService,
    private loader: LoadingController,
    private mapApi: MapquestService,
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

  async trailsByGeoLoc() {
      const loading = await this.loader.create({
      });
      loading.present().then(_ => {
          navigator.geolocation.getCurrentPosition(data => {
              console.log(data.coords.latitude, data.coords.longitude);
              this.trails$ = this.trailsApi.getTrails(data.coords.latitude, data.coords.longitude);
              this.loader.dismiss();
              // this.router.navigate(['trail', 123, 'details']);
          }, error => {
              console.log(error);
          });
      });
    // get user current lat and lon and use in the line below
    // this.trails$ = this.trails.getTrails(40.3769, -111.789);
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   console.log(resp.coords.latitude);
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });



  }

  async trailsByZip() {
      const loading = await this.loader.create({});

      loading.present().then(_ => {
          this.mapApi.getLatLonByZip(this.zipcode).subscribe(data => {
              const lat = data.results[0].locations[0].latLng.lat;
              const long = data.results[0].locations[0].latLng.lng;
              this.trails$ = this.trailsApi.getTrails(lat, long);
              this.loader.dismiss();
          });
          // navigator.geolocation.getCurrentPosition(data =>{
          //     console.log(data.coords.latitude, data.coords.longitude);
          //     this.trails$ = this.trailsApi.getTrails(data.coords.latitude, data.coords.longitude);
          //     this.loader.dismiss();
          //     // this.router.navigate(['trail', 123, 'details']);
          // }, error => {
          //     console.log(error);
          // })
      });
  }

  goToTrail(id) {
      this.router.navigate(['trail', id, 'details']);
  }




}
