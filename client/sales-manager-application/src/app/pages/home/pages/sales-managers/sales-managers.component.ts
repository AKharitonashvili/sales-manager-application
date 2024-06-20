import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-managers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesManagersComponent {

}
