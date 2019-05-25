import {Component, OnInit, ViewChild, AfterViewInit, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherService} from "../../api/weather.service";
import {TrailsApiService} from "../../api/trails-api.service";
import * as _ from 'lodash'
import {TimePipe} from "../details/weather/time.pipe";
import { Chart } from 'chart.js'
import {checkAndUpdateTextDynamic} from "@angular/core/src/view/text";
import {Time} from "@angular/common";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  @ViewChildren('lineCanvas') lineCanvas;
  lng;
  lat;
  weather$;
  lineChart = [];

  slideOpts = {
    effect: 'flip'
  };

  constructor(
      private route: ActivatedRoute,
      private weather: WeatherService,
      private trails: TrailsApiService,
      private time: TimePipe,
  ) { }

  ngOnInit() {
    this.trails.getTrailsById([Number(this.route.snapshot.paramMap.get('id'))]).subscribe(data => {
      this.lat = data.trails[0].latitude;
      this.lng = data.trails[0].longitude;
      this.weather.getForecastByCoordinates(this.lat,this.lng).subscribe(data => {
        for(let i = 0; i < data.list.length; i++){
          let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          let temp = new Date(data.list[i].dt * 1000);
          console.log(temp, data.list[i].dt);
          console.log('Im in this dfkljf;asdfjkasl;djfkasld;fjaskdlfjksld');
          let date = temp.getDate();
          let month = months[temp.getMonth()];
          // console.log(month);
          data.list[i].date = month + " " + date;
          data.list[i].month = month;
        }
        this.weather$ = _.groupBy(data.list, 'date');
        _.forEach(this.weather$, (object, index) => {
          this.weather$[index].tempData = [];
          this.weather$[index].tempLabel = [];
          object.forEach((data) =>{
            this.weather$[index].tempData.push(data.main.temp);
            this.weather$[index].tempLabel.push(this.time.transform(data.dt));
          });
          // console.log(this.weather$[index].graphData);
        });

        console.log(this.weather$);
        // console.log(this.lineCanvas);
        // this.lineCanvas.forEach(instance => {
        //   console.log(instance);
        // });
      });
    });
  }

  ngAfterViewInit(){

    // console.log(this.lineCanvas);
    this.lineCanvas.changes.subscribe(data =>{
      // console.log(data._results[0]);
      // console.log(this.weather$);
      let numIndex = 0;
        _.forEach(this.weather$, (day)=>{
          this.lineChart[numIndex] = new Chart(data._results[numIndex].nativeElement, {

            type: 'line',
            data: {
              labels: day.tempLabel,
              datasets: [
                {
                  label: "Temperature",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: day.tempData,
                  spanGaps: false,
                }
              ],
            },
            options: {
              events: ['click'],
              onClick:  this.Click(data)
            },
          });
          numIndex++;
        });



    });
    // this.lineCanvas.forEach(instance => {
    //   console.log(instance);
    // });

  }

  Click(data){

  }


}
