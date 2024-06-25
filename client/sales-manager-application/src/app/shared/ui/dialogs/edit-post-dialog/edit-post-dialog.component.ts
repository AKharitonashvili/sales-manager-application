import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonComponent } from '../../buttons/button/button.component';
import { DialogLayoutComponent } from '../../layouts/dialog-layout/dialog-layout.component';
import { productsCategoryies } from '@app/shared/config/products/products.config';
import { LatinLettersOnlyDirective } from '@app/shared/directives/latin-letters-only/latin-letters-only.directive';
import { SelectOnFocusDirective } from '@app/shared/directives/select-on-focus/select-on-focus.directive';
import { ProductsCategoryEnum } from '@app/shared/enums/products/products.enum';
import { Product } from '@app/shared/models/products/products.model';
import { ToFormGroup } from '@app/shared/models/shared.moelds';

@Component({
  selector: 'app-edit-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    LatinLettersOnlyDirective,
    SelectOnFocusDirective,
    ButtonComponent,
    DialogLayoutComponent,
  ],
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostDialogComponent {
  categories: ProductsCategoryEnum[] = productsCategoryies;

  constructor(
    private dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { form: FormGroup<ToFormGroup<Product>> },
  ) {}

  formatLabel(value: number): string {
    return value === 100 ? '99+' : `${value}`;
  }

  close(success = false) {
    this.dialogRef.close({ success });
  }
}
