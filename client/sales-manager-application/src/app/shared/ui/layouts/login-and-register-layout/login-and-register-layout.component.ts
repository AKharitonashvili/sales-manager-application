import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../buttons/button/button.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-and-register-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login-and-register-layout.component.html',
  styleUrls: ['./login-and-register-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAndRegisterLayoutComponent {
  @Input() buttonDisabled!: boolean;
  @Input() formGroup!: FormGroup<any>;
  @Output() handleClick = new EventEmitter();
}
