import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ProductSelectors,
  ProductsActions,
} from '../../../../../app/stores/products';
import { Product } from '../../../../../app/models/products/products.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  vm$: Observable<{ products: Product[] }> = combineLatest([
    this.store.select(ProductSelectors.selectProducts),
  ]).pipe(map(([products]) => ({ products })));

  constructor(private store: Store) {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  deleteProduct(id: string) {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }
}
