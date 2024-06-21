import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from 'src/app/shared/ui/layouts/page-layout/page-layout.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToFormGroup } from 'src/app/models/shared.moelds';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  Observable,
  combineLatest,
  tap,
  switchMap,
  map,
  startWith,
} from 'rxjs';
import { SalesManager } from 'src/app/models/sales-managers/sales-managers.models';
import { Store } from '@ngrx/store';
import {
  salesManagersActions,
  salesManagersSelectors,
} from 'src/app/stores/sales-managers';
import { CardComponent } from 'src/app/shared/ui/cards/card/card.component';
import { ButtonComponent } from 'src/app/shared/ui/buttons/button/button.component';

@Component({
  selector: 'app-sales-managers',
  standalone: true,
  imports: [
    CommonModule,
    PageLayoutComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CardComponent,
    ButtonComponent,
  ],
  providers: [MatNativeDateModule],
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesManagersComponent {
  filterForm: FormGroup<
    ToFormGroup<{
      username: string | null;
      surname: string | null;
      name: string | null;
      registrationDateStart: string | null;
      registrationDateEnd: string | null;
      totalSalesRevenueFrom: string | null;
      totalSalesRevenueTo: string | null;
    }>
  > = new FormGroup({
    username: new FormControl<string | null>(null),
    surname: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null),
    registrationDateStart: new FormControl<string | null>(null),
    registrationDateEnd: new FormControl<string | null>(null),
    totalSalesRevenueFrom: new FormControl<string | null>(null),
    totalSalesRevenueTo: new FormControl<string | null>(null),
  });

  vm$: Observable<{ salesManagers: SalesManager[] }> = combineLatest([
    this.store.select(salesManagersSelectors.selectSalesManagers),
    this.filterForm.valueChanges.pipe(
      startWith({
        name: null,
        registrationDateEnd: null,
        registrationDateStart: null,
        surname: null,
        totalSalesRevenueFrom: null,
        totalSalesRevenueTo: null,
        username: null,
      }),
    ),
  ]).pipe(
    map(([salesManagers, filters]) => {
      const filtersMap = new Map(
        Object.entries(filters).filter(([key, value]) => value != null),
      );

      filtersMap.forEach((value, key) => {
        switch (key) {
          case 'username':
          case 'name':
          case 'surname':
            {
              salesManagers = salesManagers.filter((salesManager) =>
                salesManager[key]
                  ?.toLocaleLowerCase()
                  .includes(filtersMap.get(key)!.toLocaleLowerCase()),
              );
            }
            break;
          case 'registrationDateStart': {
            salesManagers = salesManagers.filter(
              (salesManager) =>
                salesManager.registrationDate ??
                '' > filtersMap.get(key)!.toLocaleLowerCase(),
            );
          }
        }
      });

      return {
        salesManagers,
      };
    }),
  );

  constructor(private store: Store) {
    this.store.dispatch(salesManagersActions.loadSalesManagers());
  }

  openAddSalesManagerDialog(salesManager?: SalesManager) {}
}
