import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from 'src/app/shared/ui/layouts/page-layout/page-layout.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ToFormGroup } from 'src/app/models/shared.moelds';

@Component({
  selector: 'app-sales-managers',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent],
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesManagersComponent {
  filterForm: FormGroup<ToFormGroup<{ filterControl: string | null }>> =
    new FormGroup({
      filterControl: new FormControl<string | null>(null),
    });

  openEditProductDialog() {}
}
