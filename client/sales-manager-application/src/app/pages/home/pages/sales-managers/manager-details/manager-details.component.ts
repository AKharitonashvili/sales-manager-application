import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, take, tap } from 'rxjs';
import {
  salesManagersActions,
  salesManagersSelectors,
} from 'src/app/stores/sales-managers';
import { ActivatedRoute } from '@angular/router';
import { SalesManager } from 'src/app/models/sales-managers/sales-managers.models';
import { DetailsCardComponent } from 'src/app/shared/ui/cards/details-card/details-card.component';
import { CardComponent } from 'src/app/shared/ui/cards/card/card.component';
import { Product, SoldProduct } from 'src/app/models/products/products.model';

@Component({
  selector: 'app-manager-details',
  standalone: true,
  imports: [CommonModule, DetailsCardComponent, CardComponent],
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerDetailsComponent {
  vm$: Observable<{
    manager: SalesManager | undefined;
    products: SoldProduct[] | undefined;
  }> = combineLatest([
    this.store.select(
      salesManagersSelectors.selectSalesManagerById(
        this.route.snapshot.paramMap.get('id') ?? '',
      ),
    ),
    this.store.select(salesManagersSelectors.selectSalesManagerProducts),
  ]).pipe(
    map(([manager, products]) => ({
      manager,
      products,
    })),
    tap(console.log),
  );

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.store.dispatch(salesManagersActions.loadSalesManagers());
    this.store.dispatch(
      salesManagersActions.loadSoldProductsByManager({
        id: this.route.snapshot.paramMap.get('id') ?? '',
      }),
    );
  }
}
