import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: 'CinemaFlow - Home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'actors',
    title: 'CinemaFlow - Actors',
    loadComponent: () =>
      import('./pages/actor/actors/actors.component').then(
        (m) => m.ActorsComponent
      ),
  },
  {
    path: 'directors',
    title: 'CinemaFlow - Directors',
    loadComponent: () =>
      import('./pages/director/directors/directors.component').then(
        (m) => m.DirectorsComponent
      ),
  },
  {
    path: 'films',
    title: 'CinemaFlow - Films',
    loadComponent: () =>
      import('./pages/film/films/films.component').then(
        (m) => m.FilmsComponent
      ),
  },
  {
    path: 'ratings',
    title: 'CinemaFlow - Ratings',
    loadComponent: () =>
      import('./pages/rating/ratings/ratings.component').then(
        (m) => m.RatingsComponent
      ),
  },
];
