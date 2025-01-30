import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// Capacitor
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { Platform } from '@ionic/angular';

import {register} from 'swiper/element/bundle';

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
    private platform: Platform,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.initializeApp();
  }
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.activatedRoute.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.hideHeader = currentRoute.snapshot.data['hideHeader'] || false;
      }
    });
  }

  
  // Initialize app
  initializeApp() {

    // Wait until platform is ready
    this.platform.ready().then(async () => {

      // If we're on a mobile platform (iOS / Android), not web
      if (Capacitor.getPlatform() !== 'web') {

        // Set StatusBar style (dark / light)
        await StatusBar.setStyle({ style: Style.Dark });
      }

      // ...
      // do some more config and setup if necessary
      // ...

      // Fake timeout since we do not load any data
      setTimeout(async () => {

        // Hide SplashScreen
        await SplashScreen.hide();
      }, 2000);
    });
  }

}
