import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from '@app/shared/stores/auth';
import { LoginAndRegisterLayoutComponent } from '@app/shared/ui/layouts/login-and-register-layout/login-and-register-layout.component';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    LoginAndRegisterLayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    name: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    surname: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    password: new FormControl<string | null>('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  handleRegister() {
    this.store.dispatch(
      AuthActions.addSalesManager({
        salesManager: this.formGroup.value,
      }),
    );
    this.store
      .select(AuthSelectors.selectRegistrationSuccess)
      .pipe(
        filter((v) => v !== null),
        take(1),
      )
      .subscribe(() => {
        this.router.navigateByUrl('home/sales-managers');
      });
  }
}
