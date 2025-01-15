import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountPage } from './count.page';

describe('CountPage', () => {
  let component: CountPage;
  let fixture: ComponentFixture<CountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
