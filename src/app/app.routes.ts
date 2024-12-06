import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: 'FilmSpot - Home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'actors',
    title: 'FilmSpot - Actors',
    loadComponent: () =>
      import('./pages/actor/actors/actors.component').then(
        (m) => m.ActorsComponent
      ),
  },
  {
    path: 'directors',
    title: 'FilmSpot - Directors',
    loadComponent: () =>
      import('./pages/director/directors/directors.component').then(
        (m) => m.DirectorsComponent
      ),
  },
  {
    path: 'films',
    title: 'FilmSpot - Films',
    loadComponent: () =>
      import('./pages/film/films/films.component').then(
        (m) => m.FilmsComponent
      ),
  },
  {
    path: 'ratings',
    title: 'FilmSpot - Ratings',
    loadComponent: () =>
      import('./pages/rating/ratings/ratings.component').then(
        (m) => m.RatingsComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'FilmSpot - login',
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
    title: 'FilmSpot - signup',
    canActivate: [authGuard],
  },
];
