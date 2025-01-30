import { Component, Output, EventEmitter, output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent  {
  @Output() formSubmitted = new EventEmitter<any>();
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }



}
