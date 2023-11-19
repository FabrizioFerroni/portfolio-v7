import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLazyImgDirective]',
})
export class LazyImgDirectiveDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}
