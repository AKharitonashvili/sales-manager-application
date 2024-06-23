import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCardComponent {
  @Input() header!: string | null;
  @Input() subText!: string | null;
}
