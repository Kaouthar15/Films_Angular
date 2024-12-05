import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {}
