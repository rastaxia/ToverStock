import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TellingPage } from './telling.page';

describe('TellingPage', () => {
  let component: TellingPage;
  let fixture: ComponentFixture<TellingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TellingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
