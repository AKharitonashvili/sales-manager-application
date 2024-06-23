import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAndRegisterLayoutComponent } from 'src/app/shared/ui/layouts/login-and-register-layout/login-and-register-layout.component';
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
import {
  salesManagersActions,
  salesManagersSelectors,
} from 'src/app/stores/sales-managers';
import { Observable, combineLatest, filter, take } from 'rxjs';
import { AuthActions, AuthSelectors } from 'src/app/stores/auth';

@Component({
  selector: 'app-manager-registration',
  standalone: true,
  imports: [
    CommonModule,
    LoginAndRegisterLayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './manager-registration.component.html',
  styleUrls: ['./manager-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerRegistrationComponent {
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
