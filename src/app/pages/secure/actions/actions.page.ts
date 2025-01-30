import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  form: FormGroup;
  selectedAction: string;

  constructor() {
    this.selectedAction = '';
  }

  onActionChange() {
    console.log('Selected action:', this.selectedAction);
  }

  ngOnInit() {}
}
