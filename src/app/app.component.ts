import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform, Config, ModalController } from '@ionic/angular';
import {register} from 'swiper/element/bundle';
import { ScanService } from './services/scan.service';
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
    private scanService: ScanService,
    private zone: NgZone,
    private modalCtrl: ModalController
   
  ) {
    this.initializeApp();
  }
  
  ngOnInit(): void {
    DataWedge.addListener('scan', (event) => {
      this.zone.run(() => {
        this.modalCtrl.dismiss();
        const scannedCode = event.data;
        this.scanService.setScan(scannedCode);
        this.router.navigate(['/actions']);
      });
    });

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
