import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[latinLettersOnly]',
  standalone: true,
})
export class LatinLettersOnlyDirective {
  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const regex = /^[a-zA-Z ]*$/;

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z ]/g, '');
    }
  }
}
