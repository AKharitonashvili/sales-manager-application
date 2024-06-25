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
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {
  ProductForm,
  Product,
} from '@app/shared/models/products/products.model';
import { ToFormGroup } from '@app/shared/models/shared.moelds';
import { ProductSelectors, ProductsActions } from '@app/shared/stores/products';
import { ButtonComponent } from '@app/shared/ui/buttons/button/button.component';
import { CardComponent } from '@app/shared/ui/cards/card/card.component';
import { EditPostDialogComponent } from '@app/shared/ui/dialogs/edit-post-dialog/edit-post-dialog.component';
import { PageLayoutComponent } from '@app/shared/ui/layouts/page-layout/page-layout.component';
import { AuthSelectors } from '@app/shared/stores/auth';

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
    ReactiveFormsModule,
    CardComponent,
    MatCardModule,
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
    description: new FormControl<string>(''),
  });

  paginationSubject$ = new BehaviorSubject<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 10,
  });

  paginationLength$ = new BehaviorSubject<number>(0);

  vm$: Observable<{
    products: Product[];
    managerId: string | null | undefined;
  }> = combineLatest([
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
    this.store.select(AuthSelectors.selectManagerId),
  ]).pipe(
    map(([products, filter, managerId]) => ({
      products: filter
        ? products.filter((p) =>
            p.name?.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
          )
        : products,
      managerId,
    })),
    tap(console.log),
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
      this.productForm.controls.description.setValue(product.description ?? '');
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
    const { pageSize, pageIndex } = e;
    this.paginationSubject$.next({ pageIndex, pageSize });
  }
}
