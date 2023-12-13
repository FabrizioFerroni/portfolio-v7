import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isMenuOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    const clickedInsideMenu = this.el.nativeElement.contains(e.target);
    if (!clickedInsideMenu && this.isMenuOpen && !this.isFormButtonClicked(e)) {
      e.preventDefault();
      this.closeMenu();
    }
  }

  private isFormButtonClicked(e: Event): boolean {
    const isFormButton =
      e.target instanceof HTMLElement &&
      (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') &&
      e.target.closest('form');

    return !!isFormButton;
  }
}
