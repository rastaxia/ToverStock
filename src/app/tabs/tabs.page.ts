import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ActionService } from '../services/product-service/action.service';4
import { Keyboard } from '@capacitor/keyboard';

@Component({
  standalone: false,
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  isKeyboardVisible = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private actionService: ActionService,
    private zone: NgZone
  ) {}

ngOnInit(): void {
    Keyboard.addListener('keyboardDidShow', () => {
      this.zone.run(() => {
      this.isKeyboardVisible = true;
      });
    });

    Keyboard.addListener('keyboardDidHide', () => {
      this.zone.run(() => {
      this.isKeyboardVisible = false;
      });
    });
  }


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
          text: 'Annuleer',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
