import { Component, OnInit } from '@angular/core';
import { TrailsApiService } from '../api/trails-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
 private trails$;

  constructor(
    private trails: TrailsApiService
    ) { }

  ngOnInit() {
  }


  trailsByGeoLoc() {
    // get user current lat and lon and use in the line below
    this.trails$ = this.trails.getTrails(40.3769, -111.789);

  }




}
