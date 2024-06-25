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
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  @Input() filterInputLabel!: string;
  @Input() openAddDialogButtonText!: string;

  @Output() handleAddOrEditButton = new EventEmitter();
}
