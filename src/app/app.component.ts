import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// Capacitor
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { Platform, Config, AlertController } from '@ionic/angular';

import {register} from 'swiper/element/bundle';

import { DataWedge } from 'capacitor-datawedge';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  hideHeader = false;

  constructor(
    private alertController: AlertController,
    private config: Config,
    private platform: Platform,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
  ) {
    this.initializeApp();
  }
  
  ngOnInit(): void {
    console.log('AppComponent ngOnInit');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.activatedRoute.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.hideHeader = currentRoute.snapshot.data['hideHeader'] || false;
      }
    });

    DataWedge.addListener('scan', event => {
      this.presentAlert(`Gescannde code: ${event.data}`);
    });
  }

  
  // Initialize app
  initializeApp() {
    // Wait until platform is ready
    this.platform.ready().then(async () => {
        // await StatusBar.setStyle({ style: Style.Light });
      setTimeout(async () => {
        // Hide SplashScreen
        await SplashScreen.hide();
      }, 2000);
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Scan ontvangen!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }




}
