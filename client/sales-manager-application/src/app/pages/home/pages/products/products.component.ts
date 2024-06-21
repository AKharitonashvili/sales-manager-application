import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, map, startWith, take } from 'rxjs';
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

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  filterForm: FormGroup<ToFormGroup<{ filterControl: string | null }>> =
    new FormGroup({
      filterControl: new FormControl<string | null>(null),
    });

  Product: FormGroup<ToFormGroup<ProductForm>> = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [Validators.required]),
    quantity: new FormControl<number>(0, [Validators.required]),
    id: new FormControl<string | null>(null),
    description: new FormControl<string>(''),
    category: new FormControl<string>('', [Validators.required]),
  });

  vm$: Observable<{ products: Product[] }> = combineLatest([
    this.store.select(ProductSelectors.selectProducts),
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
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      panelClass: ['w-full', '!max-w-md', 'p-4'],
      disableClose: true,
      data: {
        form: this.Product,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(({ success }) => {
        if (success) {
          if (this.Product.valid) {
            this.store.dispatch(
              ProductsActions.addProduct({
                product: { ...this.Product.value },
              }),
            );
          }
        }
        this.Product.reset();
      });
  }
}
