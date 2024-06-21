import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../app/stores/auth';
import { ButtonComponent } from 'src/app/shared/ui/buttons/button/button.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
  ],
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    password: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  constructor(private store: Store) {}

  handleLogin() {
    this.store.dispatch(AuthActions.login(this.formGroup.value));
  }
}
