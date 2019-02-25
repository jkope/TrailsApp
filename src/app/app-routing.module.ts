import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },

  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'info', loadChildren: './user/info/info.module#InfoPageModule' },
  { path: 'trail/:id', loadChildren: './trail/trail.module#TrailPageModule' },
  { path: 'details', loadChildren: './trail/details/details.module#DetailsPageModule' },
  { path: 'weather', loadChildren: './trail/weather/weather.module#WeatherPageModule' },
  { path: 'rating', loadChildren: './trail/rating/rating.module#RatingPageModule' },  { path: 'map', loadChildren: './trail/map/map.module#MapPageModule' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
