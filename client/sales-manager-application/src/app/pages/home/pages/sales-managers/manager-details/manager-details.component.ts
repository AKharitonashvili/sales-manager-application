import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { CardComponent } from '@app/shared/ui/cards/card/card.component';
import { ActivatedRoute } from '@angular/router';
import { SalesManager } from '@app/shared/models/sales-managers/sales-managers.models';
import {
  salesManagersSelectors,
  salesManagersActions,
} from '@app/shared/stores/sales-managers';
import { DetailsCardComponent } from '@app/shared/ui/cards/details-card/details-card.component';

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
  }> = combineLatest([
    this.store.select(
      salesManagersSelectors.selectSalesManagerById(
        this.route.snapshot.paramMap.get('id') ?? '',
      ),
    ),
  ]).pipe(
    map(([manager]) => ({
      manager,
    })),
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
