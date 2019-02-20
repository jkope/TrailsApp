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
  { path: 'info', loadChildren: './user/info/info.module#InfoPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
