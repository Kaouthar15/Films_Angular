import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { FilmsResponse } from '../models/film.model';
import { environment } from '../../environment/environment';
import { GenreResponse } from '../models/genre.model';
@Injectable()
export class FilmService {
  http = inject(HttpClient);

  private filmsPage = new BehaviorSubject<number>(0);
  private selectedGenre = new BehaviorSubject<string | null>(null);
  private keyword = new BehaviorSubject<string>('');

  // Fetch genres
  genres$ = this.http
    .get<GenreResponse>(
      `${environment.API_URL}/genres/search/findAllNoPagination`
    )
    .pipe(map((response) => response._embedded.genre));

  // Combine filters and trigger the films API request
  films$: Observable<FilmsResponse> = combineLatest([
    this.keyword.pipe(debounceTime(300), distinctUntilChanged()),
    this.selectedGenre.pipe(distinctUntilChanged()),
    this.filmsPage.pipe(distinctUntilChanged()),
  ]).pipe(
    switchMap(([keyword, genre, page]) =>
      this.http.get<FilmsResponse>(
        `${environment.API_URL}/films/search/findByTitleAndGenre`,
        {
          params: {
            keyword: keyword || '',
            genreLabel: genre ?? '',
            page: page.toString(),
          },
        }
      )
    )
  );

  rateFilm(
    customerUrl: string,
    filmUrl: string,
    score: number
  ): Observable<any> {
    const payload = {
      customer: customerUrl,
      film: filmUrl,
      score,
    };
    return this.http.post(`${environment.API_URL}/film-ratings`, payload);
  }

  // Methods to update filters
  updateKeyword(keyword: string) {
    this.keyword.next(keyword);
  }

  updateSelectedGenre(genre: string | null) {
    this.selectedGenre.next(genre);
  }

  updateFilmsPage(page: number) {
    this.filmsPage.next(page);
  }
}
