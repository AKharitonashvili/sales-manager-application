import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../../buttons/button/button.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToFormGroup } from 'src/app/models/shared.moelds';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ButtonComponent,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  @Input() filterForm!: FormGroup<
    ToFormGroup<{ filterControl: string | null }>
  >;
  @Input() filterInputLabel!: string;

  @Output() openAddDialog = new EventEmitter();
}
