import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrailsApiService} from "../../api/trails-api.service";
// import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // map: Map;
  // lat = 40.3769;
  // lng = -111.789;
  trail;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private trailApi: TrailsApiService,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.trailApi.getTrailsById([Number(this.route.snapshot.paramMap.get('id'))]).subscribe(data => {
      this.trail = data.trails[0];
    });
    // this.loadmap();
  }

  // loadmap() {
  //   setTimeout(() => {
  //     this.map = new Map('map').setView([this.lat, this.lng], 8);
  //     this.map.locate({
  //       setView: true,
  //       maxZoom: 10
  //     }).on('locationfound', (e) => {
  //       console.log('found you');
  //     });
  //
  //     tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       // tslint:disable-next-line
  //       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery© <a href="https://www.mapbox.com/">Mapbox</a>',
  //     maxZoom: 18
  //   }).addTo(this.map);
  //
  //   }, 50);
  // }

}
