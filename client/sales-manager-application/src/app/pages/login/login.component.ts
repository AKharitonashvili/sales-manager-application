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
import { Router } from '@angular/router';
import { AuthActions } from '@app/shared/stores/auth';
import { ButtonComponent } from '@app/shared/ui/buttons/button/button.component';
import { LoginAndRegisterLayoutComponent } from '@app/shared/ui/layouts/login-and-register-layout/login-and-register-layout.component';
import { Store } from '@ngrx/store';
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
    LoginAndRegisterLayoutComponent,
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

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  handleLogin() {
    this.store.dispatch(AuthActions.login(this.formGroup.value));
  }

  redirectToRegister() {
    this.router.navigateByUrl('/register');
  }
}
