import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private actionSheetController: ActionSheetController,
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
          },
        },
        {
          text: 'Levering toevoegen',
          icon: 'bag-add-outline',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Breuk toevoegen',
          icon: 'remove-circle-outline',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Product toevoegen',
          icon: 'add-circle-outline',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Verplaatsing toevoegen',
          icon: 'swap-horizontal-outline',
          handler: () => {
            // Put in logic ...
          },
        },
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
