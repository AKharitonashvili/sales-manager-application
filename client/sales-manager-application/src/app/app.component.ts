import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent,
    CommonModule,
    TranslateModule,
    MatIconModule,
  ],
})
export class AppComponent {
  currentLanguage!: string;

  constructor(private translateService: TranslateService) {
    this.currentLanguage = localStorage.getItem('currentLanguage') ?? 'en-US';
    this.translateService.use(this.currentLanguage);
  }

  handleLanguageChange(language: string) {
    this.translateService.use(language);
    this.currentLanguage = language;
    localStorage.setItem('currentLanguage', this.currentLanguage);
  }
}
