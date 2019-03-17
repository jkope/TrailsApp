import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrailsApiService} from '../../api/trails-api.service';
// import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import L from 'leaflet';
<<<<<<< HEAD
import {FirebaseService} from "../../api/firebase.service";
=======
import { FirebaseService } from '../../api/firebase.service';
>>>>>>> e800f8ed18d93008869184909adf7d78b8801e90

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {


  // lat = 40.3769;
  // lng = -111.789;
  trail;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private trailApi: TrailsApiService,
      private firebase: FirebaseService,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.trailApi.getTrailsById([Number(this.route.snapshot.paramMap.get('id'))]).subscribe(data => {
      this.trail = data.trails[0];
      console.log(this.trail);
    });


  }

  segmentChanged(event) {
    console.log(event.detail.value);
    if(event.detail.value == 'toHike'){
      this.firebase.pushToHike(this.trail);
    }
    else if(event.detail.value == 'Hiked'){
      this.firebase.pushHasHiked(this.trail);
    }

  }



}
