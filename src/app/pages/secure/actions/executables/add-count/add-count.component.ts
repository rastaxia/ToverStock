import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-add-count',
  templateUrl: './add-count.component.html',
  styleUrls: ['./add-count.component.scss']
})
export class AddCountComponent implements OnInit {
  countForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {
    this.countForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]],
      barcode: ['', [Validators.required, Validators.minLength(6)]]
    
    });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.countForm.valueChanges.subscribe(() => {
        this.ngZone.run(() => {});
      });
    });
  }

  onSubmit() {
    if (this.countForm.valid) {
      console.log('Form submitted:', this.countForm.value);
    }
  }
}
