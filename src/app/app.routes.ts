import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'playerlist',
    loadComponent: () => import('./pages/playerlist/playerlist.page').then( m => m.Playerlist)
  },
  {
    path: 'playerdetails/:id',
    loadComponent: () => import('./pages/playerdetails/playerdetails.page').then( m => m.PlayerdetailsPage)
  },
];
