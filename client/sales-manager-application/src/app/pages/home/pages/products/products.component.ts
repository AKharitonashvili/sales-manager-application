import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ProductSelectors,
  ProductsActions,
} from '../../../../../app/stores/products';
import {
  Product,
  ProductForm,
} from '../../../../../app/models/products/products.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ToFormGroup } from '../../../../../app/models/shared.moelds';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../../../../../app/shared/ui/dialogs/edit-post-dialog/edit-post-dialog.component';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { ButtonComponent } from 'src/app/shared/ui/buttons/button/button.component';
import { PageLayoutComponent } from 'src/app/shared/ui/layouts/page-layout/page-layout.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    ButtonComponent,
    PageLayoutComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  filterForm: FormGroup<ToFormGroup<{ filterControl: string | null }>> =
    new FormGroup({
      filterControl: new FormControl<string | null>(null),
    });

  productForm: FormGroup<ToFormGroup<ProductForm>> = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [Validators.required]),
    quantity: new FormControl<number>(0, [Validators.required]),
    category: new FormControl<string>('', [Validators.required]),
  });

  paginationSubject$ = new BehaviorSubject<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 10,
  });

  paginationLength$ = new BehaviorSubject<number>(0);

  vm$: Observable<{ products: Product[] }> = combineLatest([
    this.store.select(ProductSelectors.selectProducts).pipe(
      tap((products) => this.paginationLength$.next(products.length)),
      switchMap((products) =>
        this.paginationSubject$.pipe(
          map(({ pageIndex, pageSize }) =>
            products.filter(
              (item, index) =>
                index >= pageIndex * pageSize &&
                index < pageIndex * pageSize + pageSize,
            ),
          ),
        ),
      ),
    ),
    this.filterForm.controls.filterControl.valueChanges.pipe(startWith(null)),
  ]).pipe(
    map(([products, filter]) => ({
      products: filter
        ? products.filter((p) => p.name?.includes(filter))
        : products,
    })),
  );

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  deleteProduct(id: string) {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }

  openEditProductDialog(product?: Product) {
    this.dialog.closeAll();
    if (product) {
      this.productForm.controls.name.setValue(product.name ?? '');
      this.productForm.controls.price.setValue(product.price ?? 1);
      this.productForm.controls.quantity.setValue(product.quantity ?? 1);
      this.productForm.controls.category.setValue(product.category ?? '');
    }
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      panelClass: ['w-full', '!max-w-md', 'p-4'],
      data: {
        form: this.productForm,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        map((v) => (v ? v : { success: false })),
      )
      .subscribe(({ success }) => {
        if (success) {
          if (this.productForm.valid) {
            if (product) {
              this.store.dispatch(
                ProductsActions.editProduct({
                  product: { ...this.productForm.value, id: product.id },
                }),
              );
            } else {
              this.store.dispatch(
                ProductsActions.addProduct({
                  product: { ...this.productForm.value },
                }),
              );
            }
          }
        }
        this.productForm.reset();
      });
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    const { pageSize, pageIndex } = e;
    this.paginationSubject$.next({ pageIndex, pageSize });
  }
}
