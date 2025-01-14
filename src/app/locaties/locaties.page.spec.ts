import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocatiesPage } from './locaties.page';

describe('LocatiesPage', () => {
  let component: LocatiesPage;
  let fixture: ComponentFixture<LocatiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
