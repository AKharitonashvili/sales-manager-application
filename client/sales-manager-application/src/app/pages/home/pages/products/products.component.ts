import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

}
