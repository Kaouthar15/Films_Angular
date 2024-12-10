import {
  Component,
  inject,
  model,
  signal,
  WritableSignal,
} from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environment/environment';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilmDetailsComponent } from '../film-details/film-details.component';
import { Film } from '../../../models/film.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-films',
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
    FontAwesomeModule,
    FilmDetailsComponent,
  ],
  providers: [FilmService],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent {
  filmService = inject(FilmService);
  authService = inject(AuthService);

  genres$ = this.filmService.genres$;
  films$ = this.filmService.films$;

  genreModel = model<string>('');
  keywordModel = model<string>('');

  isFilmsLoading = this.filmService.isLoading$;

  serverUrl = environment.SERVER_URL;

  nextIcon = faChevronRight;

  previousIcon = faChevronLeft;

  selectedFilm: WritableSignal<null | Film> = signal(null);
  filmDialogVisible = signal(false);

  onKeywordChange() {
    this.filmService.updateKeyword(this.keywordModel());
  }

  onGenreChange() {
    this.filmService.updateSelectedGenre(this.genreModel());
  }

  onPageChange(change: number) {
    this.filmService.updateFilmsPage(change);
  }

  viewFilmDetails(film: Film) {
    this.selectedFilm.set(null);
    setTimeout(() => {
      this.selectedFilm.set(film);
      this.filmDialogVisible.set(true);
    });
  }
}
