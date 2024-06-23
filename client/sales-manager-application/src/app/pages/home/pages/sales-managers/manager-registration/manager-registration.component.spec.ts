import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRegistrationComponent } from './manager-registration.component';

describe('ManagerRegistrationComponent', () => {
  let component: ManagerRegistrationComponent;
  let fixture: ComponentFixture<ManagerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ManagerRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
