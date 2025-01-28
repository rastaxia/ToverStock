import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPwPage } from './forgot-pw.page';

describe('ForgotPwPage', () => {
  let component: ForgotPwPage;
  let fixture: ComponentFixture<ForgotPwPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
