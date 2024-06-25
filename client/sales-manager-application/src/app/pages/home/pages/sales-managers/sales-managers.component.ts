import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Observable, combineLatest, map, startWith, debounceTime } from 'rxjs';
import { Router } from '@angular/router';
import { CardComponent } from '@app/shared/ui/cards/card/card.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SalesManager } from '@app/shared/models/sales-managers/sales-managers.models';
import { ToFormGroup } from '@app/shared/models/shared.moelds';
import {
  salesManagersSelectors,
  salesManagersActions,
} from '@app/shared/stores/sales-managers';
import { ButtonComponent } from '@app/shared/ui/buttons/button/button.component';
import { PageLayoutComponent } from '@app/shared/ui/layouts/page-layout/page-layout.component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
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

  managerForm: FormGroup<
    ToFormGroup<{
      username: string | null;
      surname: string | null;
      name: string | null;
    }>
  > = new FormGroup({
    username: new FormControl<string | null>(null),
    surname: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null),
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
      debounceTime(300),
    ),
  ]).pipe(
    map(([salesManagers, filters]) => {
      const filtersMap = new Map<string, any>(
        Object.entries(filters).filter(([key, value]) => value != null),
      );

      const filterByString = (
        salesManagers: SalesManager[],
        key: string,
        value: string,
      ): SalesManager[] =>
        salesManagers.filter((salesManager) =>
          salesManager[key as keyof SalesManager]
            ?.toString()
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()),
        );

      const filterByDate = (
        salesManagers: SalesManager[],
        key: string,
        value: string,
      ): SalesManager[] => {
        const date = new Date(value);
        return salesManagers.filter((salesManager) => {
          if (salesManager.registrationDate) {
            const registrationDate = new Date(salesManager.registrationDate);
            return key === 'registrationDateStart'
              ? registrationDate > date
              : registrationDate < date;
          }
          return false;
        });
      };

      const filterByRevenue = (
        salesManagers: SalesManager[],
        key: string,
        value: string,
      ): SalesManager[] => {
        const revenueFilter = parseFloat(value);
        return salesManagers.filter((salesManager) => {
          if (salesManager.totalSalesRevenue) {
            return key === 'totalSalesRevenueFrom'
              ? salesManager.totalSalesRevenue > revenueFilter
              : salesManager.totalSalesRevenue < revenueFilter;
          }
          return false;
        });
      };

      filtersMap.forEach((value, key) => {
        switch (key) {
          case 'username':
          case 'name':
          case 'surname':
            salesManagers = filterByString(salesManagers, key, value);
            break;
          case 'registrationDateStart':
          case 'registrationDateEnd':
            salesManagers = filterByDate(salesManagers, key, value);
            break;
          case 'totalSalesRevenueFrom':
          case 'totalSalesRevenueTo':
            salesManagers = filterByRevenue(salesManagers, key, value);
            break;
          default:
            break;
        }
      });

      return { salesManagers };
    }),
  );

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.store.dispatch(salesManagersActions.loadSalesManagers());
  }

  registerNewManager() {
    this.router.navigateByUrl('home/sales-managers/register');
  }

  navigateToManagerDetails(id: string) {
    this.router.navigate(['home', 'sales-managers', id]);
  }
}
