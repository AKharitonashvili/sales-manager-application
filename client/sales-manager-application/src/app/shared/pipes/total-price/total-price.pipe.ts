import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPrice',
  standalone: true,
})
export class TotalPricePipe implements PipeTransform {
  transform({ price, quantity }: { price: number; quantity: number }): number {
    return price * quantity;
  }
}
