import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Screening, ScreeningResponse } from '../models/screening.model';
import { environment } from '../../environment/environment';

@Injectable()
export class ScreeningService {
  http = inject(HttpClient);

  screenings$ = this.http
    .get<ScreeningResponse>(
      `${environment.API_URL}/screenings/search/findUpcomingScreenings`
    )
    .pipe(map((res) => res._embedded.screenings));
}
