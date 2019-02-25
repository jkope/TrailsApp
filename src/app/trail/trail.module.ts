import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrailPage } from './trail.page';

const routes: Routes = [
  {
    path: '',
    component: TrailPage,
    children: [
      {
        path: 'details',
        children: [
          {
            path: '',
            loadChildren: './details/details.module#DetailsPageModule'
          }
        ]
      },
      {
        path: 'weather',
        children: [
          {
            path: '',
            loadChildren: './weather/weather.module#WeatherPageModule'
          }
        ]
      },
      {
        path: 'rating',
        children: [
          {
            path: '',
            loadChildren: './rating/rating.module#RatingPageModule'
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: './map/map.module#MapPageModule'
          }
        ]
      }
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrailPage]
})
export class TrailPageModule {}
