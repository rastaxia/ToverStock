import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: false
})
export class Productspage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
}
