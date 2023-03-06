import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesGuardService } from './guards/guard.service';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [PagesGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
