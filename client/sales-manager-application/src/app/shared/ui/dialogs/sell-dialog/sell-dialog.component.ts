import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@app/shared/models/products/products.model';
import { ToFormGroup } from '@app/shared/models/shared.moelds';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { LatinLettersOnlyDirective } from '@app/shared/directives/latin-letters-only/latin-letters-only.directive';
import { SelectOnFocusDirective } from '@app/shared/directives/select-on-focus/select-on-focus.directive';
import { ButtonComponent } from '../../buttons/button/button.component';
import { DialogLayoutComponent } from '../../layouts/dialog-layout/dialog-layout.component';
import { TotalPricePipe } from '@app/shared/pipes/total-price/total-price.pipe';

@Component({
  selector: 'app-sell-dialog',
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
    TotalPricePipe,
  ],
  providers: [],
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { form: FormGroup<ToFormGroup<Product>>; maxQuantity: number },
  ) {}

  formatLabel(value: number): string {
    return value === 100 ? '99+' : `${value}`;
  }

  close(success = false) {
    this.dialogRef.close({ success });
  }
}
