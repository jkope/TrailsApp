import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherService} from "../../api/weather.service";
import {TrailsApiService} from "../../api/trails-api.service";
import * as _ from 'lodash'
import {TimePipe} from "./time.pipe";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  lng;
  lat;
  weather$;

  slideOpts = {
    effect: 'flip'
  };

  constructor(
      private route: ActivatedRoute,
      private weather: WeatherService,
      private trails: TrailsApiService,
  ) { }

  ngOnInit() {
    this.trails.getTrailsById([Number(this.route.snapshot.paramMap.get('id'))]).subscribe(data => {
      this.lat = data.trails[0].latitude;
      this.lng = data.trails[0].longitude;
      this.weather.getForecastByCoordinates(this.lat,this.lng).subscribe(data => {
        for(let i = 0; i < data.list.length; i++){
          let months = ['Jan', 'Feb', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];
          let temp = new Date(data.list[i].dt * 1000);
          let date = temp.getDate();
          let month = months[temp.getMonth()];
          data.list[i].date = month + " " + date;
          data.list[i].month = month;
        }
        this.weather$ = _.groupBy(data.list, 'date');

        console.log(this.weather$);
      });
    });
  }

}
