import { Component, OnInit } from '@angular/core';
import { TrailsApiService } from 'src/app/api/trails-api.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/api/firebase.service';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})

export class RatingPage implements OnInit {
  id = Number(this.route.snapshot.paramMap.get('id'));
  trail;
  private comment = '';
  private comments;
  private userId;
  private rating;



  constructor(
    private auth: AuthService,
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private trailApi: TrailsApiService,
  ) { }

  ngOnInit() {
    this.userId = this.auth.getUser();
    console.log(this.id);
    this.trailApi.getTrailsById([this.id]).subscribe(data => {
      this.trail = data.trails[0];
    });
    this.firebase.getCommentsFor(this.id).subscribe(data => {
      // this.comments = data;
      console.log(data);
    });
    if (!this.rating) {this.rating = this.firebase.getUserTrailRating(this.id); }
  }

  submitForm() {
    const trail = {id: this.id};
    const com = {comment: this.comment,
                      rating: this.rating};
    console.log(this.rating + ' ' + this.comment);
    console.log(com);
    this.firebase.addTrail(trail, com, this.userId );
  }

}
