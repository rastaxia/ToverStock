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
  contentLoaded = false;

  constructor(
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


  }

  
  // Initialize app
  initializeApp() {
    // Wait until platform is ready
    this.platform.ready().then(async () => {
      setTimeout(async () => {
        await SplashScreen.hide();
      }, 2000);
    });
  }



  


}
