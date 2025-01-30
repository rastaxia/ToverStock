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
      count: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    // This runs the form value changes outside Angular's zone
    this.ngZone.runOutsideAngular(() => {
      this.countForm.valueChanges.subscribe(() => {
        // Only run change detection when necessary
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
