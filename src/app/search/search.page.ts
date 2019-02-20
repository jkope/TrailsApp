import { Component, OnInit } from '@angular/core';
import { Geolocation }  from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
  }

  // searchByLocation(){
  //   this.geolocation.getCurrentPosition().then(resp => {
  //     console.log(resp.coords.latitude);
  //     console.log(resp.coords.longitude);
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }

}
