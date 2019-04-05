import { Component, OnInit } from '@angular/core';
import { TrailsApiService } from 'src/app/api/trails-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})

export class RatingPage implements OnInit {
  id = Number(this.route.snapshot.paramMap.get('id'));
  trail;
  private rate = '';
  private comment = '';


  constructor(
    private route: ActivatedRoute,
    private trailApi: TrailsApiService
  ) { }

  ngOnInit() {
    this.trailApi.getTrailsById([this.id]).subscribe(data => {
      this.trail = data.trails[0];
    });
  }

  submitForm() {
    
    console.log(this.rate + this.comment);
  }

}
