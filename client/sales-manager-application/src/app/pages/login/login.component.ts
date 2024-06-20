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
import { AuthActions } from 'src/app/stores/auth';
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
  ],
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
    password: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor(private store: Store) {}

  handleLogin() {
    this.store.dispatch(AuthActions.login(this.formGroup.value));
  }
}
