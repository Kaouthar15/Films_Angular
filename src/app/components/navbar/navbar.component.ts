import { CommonModule } from '@angular/common';
import {
  faBars,
  faCartShopping,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  destroy = inject(DestroyRef);
  router = inject(Router);

  showCart: WritableSignal<boolean> = signal(false);
  showInbox: WritableSignal<boolean> = signal(false);
  isMenuOpen: WritableSignal<boolean> = signal(false);

  menuIcon = faBars;
  xMarkIcon = faXmark;
  cartIcon = faCartShopping;

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggleMenuOutsideClick($event: MouseEvent) {
    const menuDiv = document.querySelector('#menuDiv');
    const targetElement = $event.target as HTMLElement;
    if (!menuDiv?.contains(targetElement)) {
      this.toggleMenu();
    }
  }

  openCart() {
    this.showCart.set(true);
  }

  closeCart() {
    this.showCart.set(false);
  }
  openInbox() {
    this.showInbox.set(true);
  }

  closeInbox() {
    this.showInbox.set(false);
  }

  logout() {
    // this.authService
    //   .logout()
    //   .pipe(takeUntilDestroyed(this.destroy))
    //   .subscribe((response) => {
    //     this.router.navigate(['/']);
    //     this.notificationStore.notify(
    //       response.message,
    //       NotificationType.SUCCESS
    //     );
    //   });
  }

  @HostListener('document:scroll')
  handleScrolling() {
    this.isMenuOpen.set(false);
  }
}
