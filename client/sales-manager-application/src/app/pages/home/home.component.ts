import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@app/shared/ui/buttons/button/button.component';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/shared/stores/auth';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
  ) {
    this.store.dispatch(AuthActions.userInfo());
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.store.dispatch(AuthActions.reset());
  }
}
