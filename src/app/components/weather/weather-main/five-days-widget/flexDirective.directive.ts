import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({ selector: '[flex-wide]' })
export class FlexDirective {
  @HostListener('click') onClick() {
    let dayElements = this._document.querySelectorAll('.day-unit__component');
    dayElements.forEach((dayEl) => {
      console.log(dayEl);
      dayEl.classList.remove('my_flex_class');
    });
    console.log(dayElements);
    this.renderer.addClass(this.elementRef.nativeElement, 'my_flex_class');
  }
  constructor(
    @Inject(DOCUMENT) private _document: HTMLDocument,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  changePrevious() {}
}
