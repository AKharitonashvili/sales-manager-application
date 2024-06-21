import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from 'src/app/shared/ui/layouts/page-layout/page-layout.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToFormGroup } from 'src/app/models/shared.moelds';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
      registrationDateStart: Date | null;
      registrationDateEnd: Date | null;
      totalRevenue: string | null;
    }>
  > = new FormGroup({
    username: new FormControl<string | null>(null),
    surname: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null),
    registrationDateStart: new FormControl<Date | null>(null),
    registrationDateEnd: new FormControl<Date | null>(null),
    totalRevenue: new FormControl<string | null>(null),
  });

  openEditProductDialog() {}
}
