import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScreeningService } from '../../services/screening.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { environment } from '../../../environment/environment';
import { RouterModule } from '@angular/router';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    AsyncPipe,
    CarouselModule,
    TagModule,
    ButtonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [ScreeningService],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  screeningService = inject(ScreeningService);

  serverUrl = environment.SERVER_URL;

  downArrowIcon = faArrowDown;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  @ViewChild('upcomingScreenings') upcomingScreenings!: ElementRef;
  scrollToUpcomingScreenings() {
    this.upcomingScreenings.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
  ngOnInit(): void {
    this.screeningService.getUpcomingScreening();
  }
}
