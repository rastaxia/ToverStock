import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

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
    private router: Router
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
            this.router.navigateByUrl('/actions');
            localStorage.setItem('selectedAction', 'add-count');
          },
        },
        {
          text: 'Levering toevoegen',
          icon: 'bag-add-outline',
          handler: () => {
            this.router.navigateByUrl('/actions');
            localStorage.setItem('selectedAction', 'add-delivery');
          },
        },
        {
          text: 'Breuk toevoegen',
          icon: 'remove-circle-outline',
          handler: () => {
            this.router.navigateByUrl('/actions');
            localStorage.setItem('selectedAction', 'add-fraction');
          },
        },
        {
          text: 'Verplaatsing toevoegen',
          icon: 'swap-horizontal-outline',
          handler: () => {
            this.router.navigateByUrl('/actions');
            localStorage.setItem('selectedAction', 'move-product');
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
