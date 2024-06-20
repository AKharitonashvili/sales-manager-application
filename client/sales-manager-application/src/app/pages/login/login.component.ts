import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class LoginComponent {

}
