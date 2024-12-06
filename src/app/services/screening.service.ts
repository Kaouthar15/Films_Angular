import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Screening, ScreeningResponse } from '../models/screening.model';
import { environment } from '../../environment/environment';

@Injectable()
export class ScreeningService {
  http = inject(HttpClient);

  upcomingScreenings = new BehaviorSubject<Screening[]>([]);

  screenings$ = this.upcomingScreenings.asObservable();

  public getUpcomingScreening(): void {
    this.http
      .get<ScreeningResponse>(
        `${environment.API_URL}/screenings/search/findUpcomingScreenings`
      )
      .pipe(
        tap((res) => {
          console.log('Screenings: ', res);

          this.upcomingScreenings.next(res._embedded.screenings);
        })
      )
      .subscribe();
  }
}
