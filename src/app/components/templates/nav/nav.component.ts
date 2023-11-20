import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
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
  onDocumentClick(e: Event) {
    e.preventDefault();
    const clickedInsideMenu = this.el.nativeElement.contains(e.target);
    if (!clickedInsideMenu && this.isMenuOpen) {
      this.closeMenu();
    }
  }

}
