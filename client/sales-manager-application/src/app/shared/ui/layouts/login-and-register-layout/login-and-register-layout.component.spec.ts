import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndRegisterLayoutComponent } from './login-and-register-layout.component';

describe('LoginAndRegisterLayoutComponent', () => {
  let component: LoginAndRegisterLayoutComponent;
  let fixture: ComponentFixture<LoginAndRegisterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoginAndRegisterLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAndRegisterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
