import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {

  @Input() pageTitle: string = '';
  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open('end');
  }
}
