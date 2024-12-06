import { Component, inject, OnInit } from '@angular/core';
import { ScreeningService } from '../../services/screening.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { environment } from '../../../environment/environment';
import { RouterModule } from '@angular/router';

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
  ],
  providers: [ScreeningService],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  screeningService = inject(ScreeningService);

  serverUrl = environment.SERVER_URL;

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

  ngOnInit(): void {
    this.screeningService.getUpcomingScreening();
  }
}
