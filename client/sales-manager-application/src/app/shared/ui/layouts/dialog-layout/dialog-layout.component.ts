import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-layout',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dialog-layout.component.html',
  styleUrls: ['./dialog-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogLayoutComponent {
  @Output() close = new EventEmitter();
}
