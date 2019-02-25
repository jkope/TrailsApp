import { Component, OnInit } from '@angular/core';
import {TrailsApiService} from "../../api/trails-api.service";
import L from 'leaflet';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  trail;
  map: L.Map;
  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      // specify the path here
      iconUrl: '../../assets/marker-icon.png',
      shadowUrl: '../../assets/marker-shadow.png'
    })
  };

  constructor(
      private trailApi: TrailsApiService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.trailApi.getTrailsById([Number(this.route.snapshot.paramMap.get('id'))]).subscribe(data => {
      this.trail = data.trails[0];
      this.loadmap();
    });
  }

  loadmap() {
    setTimeout(() => {
      this.map = L.map('map').setView([this.trail.latitude, this.trail.longitude], 10);
      let marker = L.marker([this.trail.latitude, this.trail.longitude], this.icon).addTo(this.map);
      // let marker = Map.marker([[this.trail.latitude, this.trail.longitude]).addTo(this.map);
      this.map.locate({
        setView: true,
        maxZoom: 10
      }).on('locationfound', (e) => {
        let Locmarker: any = L.marker([e.latitude, e.longitude], this.icon).addTo(this.map);
      }).on('locationerror', (err) => {
        alert(err.message);
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // tslint:disable-next-line
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery© <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18
      }).addTo(this.map);

    }, 50);
  }

}
