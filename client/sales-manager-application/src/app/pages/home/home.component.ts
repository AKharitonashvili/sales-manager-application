import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@app/shared/ui/buttons/button/button.component';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/shared/stores/auth';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
  ) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.store.dispatch(AuthActions.reset());
  }
}
