import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[selectOnFocus]',
  standalone: true,
})
export class SelectOnFocusDirective {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLInputElement>,
  ) {}

  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLInputElement) {
    this.renderer.selectRootElement(target).select();
  }
}
