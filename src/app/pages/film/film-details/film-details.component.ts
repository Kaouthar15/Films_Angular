import {
  Component,
  EventEmitter,
  inject,
  Input,
  model,
  Output,
} from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { Dialog } from 'primeng/dialog';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Film } from '../../../models/film.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  NotificationStore,
  NotificationType,
} from '../../../store/notification.store';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [Dialog, FormsModule, CommonModule, Rating, FontAwesomeModule],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '50vw' }"
      class="rounded-lg shadow-lg"
      [closable]="false"
    >
      <button
        (click)="visible = false"
        class="text-gray-600 w-full text-right text-3xl right-0 hover:text-gray-800 bg-transparent rounded-full p-2 transition"
        aria-label="Close"
      >
        <fa-icon [icon]="closeIcon"></fa-icon>
      </button>
      <ng-container *ngIf="film as filmItem">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div
            class="flex flex-col items-center md:flex-row md:items-start md:gap-6"
          >
            <img
              [src]="serverUrl + filmItem.imageUrl"
              alt="Film image"
              class="w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0"
            />
            <div class="w-full md:w-2/3 space-y-4">
              <h2 class="text-2xl font-bold text-gray-800">
                {{ filmItem.title }}
              </h2>
              <p class="text-sm text-gray-700">
                <strong class="font-medium text-gray-800">Year:</strong>
                {{ filmItem.year }}
              </p>
              <p class="text-sm text-gray-700">
                <strong class="font-medium text-gray-800">Duration:</strong>
                {{ filmItem.duration }} mins
              </p>
              <p class="text-sm text-gray-700">
                <strong class="font-medium text-gray-800">Description:</strong>
                {{ filmItem.description }}
              </p>
            </div>
          </div>
          <div class="mt-6">
            <label for="score" class="block text-sm font-medium text-gray-800">
              Rate this film:
            </label>
            <p-rating [(ngModel)]="score" stars="5"></p-rating>
          </div>
          <div class="mt-6 flex justify-end">
            <button
              pButton
              label="Submit Rating"
              (click)="submitRating()"
              class="bg-blue-400 text-blue-900 py-2 px-4 rounded-lg shadow-md hover:bg-blue-300 transition"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </ng-container>
    </p-dialog>
  `,
  styles: [``],
})
export class FilmDetailsComponent {
  @Input() visible!: boolean;

  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() film!: Film | null;

  // @Input() customerUrl!: string;

  notificationStore = inject(NotificationStore);

  closeIcon = faXmark;

  serverUrl = environment.SERVER_URL;

  score = model(0);

  private readonly filmService = inject(FilmService);

  submitRating() {
    if (this.film && this.score() > 0) {
      this.filmService.rateFilm(this.film.title, this.score()).subscribe({
        next: () => {
          this.notificationStore.notify(
            'Rating submitted successfully',
            NotificationType.SUCCESS
          );
          this.closeDialog();
        },
        error: () =>
          this.notificationStore.notify(
            'You need to signup first',
            NotificationType.ERROR
          ),
      });
    } else {
      this.notificationStore.notify(
        'Please select a rating',
        NotificationType.INFO
      );
    }
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.film = null;
  }
}
