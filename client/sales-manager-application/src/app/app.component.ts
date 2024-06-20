import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, LoginComponent, CommonModule],
})
export class AppComponent {
  isUserLoggedIn = false;

  handleLogin(success: boolean) {
    if (success) {
      this.isUserLoggedIn = true;
    }
  }
}
