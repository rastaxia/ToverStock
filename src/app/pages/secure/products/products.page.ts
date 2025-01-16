import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  content_loaded: boolean = false;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

  }

 

}
