import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ProductSelectors,
  ProductsActions,
} from '../../../../../app/stores/products';
import { Products } from '../../../../../app/models/products/products.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  vm$: Observable<{ products: Products[] }> = combineLatest([
    this.store.select(ProductSelectors.selectProducts),
  ]).pipe(map(([products]) => ({ products })));

  constructor(private store: Store) {
    console.log('constructor');
    this.store.dispatch(ProductsActions.loadProducts());
  }
}
