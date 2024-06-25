import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { SalesManagersState } from '../stores/sales-managers/sales-managers.reducers';
import { salesManagersSelectors } from '../stores/sales-managers';

@Injectable({
  providedIn: 'root',
})
export class SalesManagerResolver implements Resolve<any> {
  constructor(private store: Store<SalesManagersState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this.store
      .select(salesManagersSelectors.selectSalesManagerProducts)
      .pipe(
        take(1),
        map((data) => {
          if (data) {
            return data;
          } else {
            return of(null);
          }
        }),
      );
  }
}
