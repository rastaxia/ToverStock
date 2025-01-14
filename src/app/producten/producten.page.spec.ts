import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductenPage } from './producten.page';

describe('ProductenPage', () => {
  let component: ProductenPage;
  let fixture: ComponentFixture<ProductenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
