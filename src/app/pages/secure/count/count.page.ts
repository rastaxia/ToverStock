import { AfterContentChecked, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import { AlertController, IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-count',
  templateUrl: './count.page.html',
  styleUrls: ['./count.page.scss'],
})
export class CountPage implements AfterContentChecked {


  // Swiper config
  config: SwiperOptions = {

  }



  constructor(
    private alertController: AlertController,
    private toastService: ToastService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngAfterContentChecked(): void {

  }


}
