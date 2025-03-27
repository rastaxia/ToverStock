import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ActionService } from '../services/product-service/action.service';

@Component({
  standalone: false,
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isKeyboardVisible = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private actionService: ActionService
  ) {}

  // Select action
  async selectAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Kies een actie',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Telling toevoegen',
          icon: 'reader-outline',
          handler: () => {
            this.actionService.setSelectedAction('add-count');
            this.router.navigateByUrl('/actions');
          },
        },
        {
          text: 'Levering toevoegen',
          icon: 'bag-add-outline',
          handler: () => {
            this.actionService.setSelectedAction('add-delivery');
            this.router.navigateByUrl('/actions');
          },
        },
        {
          text: 'Breuk toevoegen',
          icon: 'remove-circle-outline',
          handler: () => {
            this.actionService.setSelectedAction('add-fraction');
            this.router.navigateByUrl('/actions');
          },
        },
        {
          text: 'Verplaatsing toevoegen',
          icon: 'swap-horizontal-outline',
          handler: () => {
            this.actionService.setSelectedAction('move-product');
            this.router.navigateByUrl('/actions');
          },
        },
        // {
        //   text: 'Product toevoegen',
        //   icon: 'add-circle-outline',
        //   handler: () => {
        //     // Put in logic ...
        //   },
        // },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
