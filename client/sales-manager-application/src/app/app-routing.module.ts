import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((x) => x.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((x) => x.LoginComponent),
  },
  // {
  //   path: 'sales-managers',
  //   component: SalesManagersComponent,
  // },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
