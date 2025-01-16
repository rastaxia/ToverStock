import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Productspage } from './products.page';

describe('ProductenPage', () => {
  let component: Productspage;
  let fixture: ComponentFixture<Productspage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Productspage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
