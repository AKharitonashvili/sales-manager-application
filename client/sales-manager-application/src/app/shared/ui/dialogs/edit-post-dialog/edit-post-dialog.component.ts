import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/models/products/products.model';
import { ToFormGroup } from 'src/app/models/shared.moelds';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { productsCategoryies } from 'src/app/config/products/products.config';
import { ProductsCategoryEnum } from 'src/app/enums/products/products.enum';
import { MatSliderModule } from '@angular/material/slider';
import { LatinLettersOnlyDirective } from 'src/app/shared/directives/latin-letters-only/latin-letters-only.directive';
import { SelectOnFocusDirective } from 'src/app/shared/directives/select-on-focus/select-on-focus.directive';
import { ButtonComponent } from '../../buttons/button/button.component';

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
  ) {
    console.log(data.form.value);
  }

  formatLabel(value: number): string {
    return value === 100 ? '99+' : `${value}`;
  }

  close(success: boolean = false) {
    this.dialogRef.close({ success });
  }
}
