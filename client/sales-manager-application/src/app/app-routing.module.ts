import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { SalesManagerResolver } from './shared/resolvers/sales-managers.resolver';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((x) => x.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/home/pages/products/products.component').then(
            (x) => x.ProductsComponent,
          ),
      },
      {
        path: 'sales-managers',
        loadComponent: () =>
          import(
            './pages/home/pages/sales-managers/sales-managers.component'
          ).then((x) => x.SalesManagersComponent),
      },
      {
        path: 'sales-managers/register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (x) => x.RegisterComponent,
          ),
      },
      {
        path: 'sales-managers/:id',
        loadComponent: () =>
          import(
            './pages/home/pages/sales-managers/manager-details/manager-details.component'
          ).then((x) => x.ManagerDetailsComponent),
        resolve: {
          salesManagers: SalesManagerResolver,
        },
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (x) => x.RegisterComponent,
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
