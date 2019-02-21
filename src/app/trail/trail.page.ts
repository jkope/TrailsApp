import { Component, OnInit } from '@angular/core';
import {TrailsApiService} from "../api/trails-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trail',
  templateUrl: './trail.page.html',
  styleUrls: ['./trail.page.scss'],
})
export class TrailPage implements OnInit {

  trailId;
  trailName;

  constructor(
      private trailApi: TrailsApiService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.trailId = Number(this.route.snapshot.paramMap.get('id'));
    this.trailApi.getTrailsById([this.trailId]).subscribe(data => {
      this.trailName = data.trails[0].name;
    })
  }

}
