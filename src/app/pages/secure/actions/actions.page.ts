import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LocationsService } from 'src/app/services/product-service/locations.service';
import { DataWedge } from 'capacitor-datawedge';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  standalone: false,
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  form: FormGroup;
  selectedAction: string;
  locationList = [];
  selectedLocation: number;
  scannedCode: string = '';

  productID: number | null;
  scannedProduct: any;

  constructor(
    private articleService: ArticleService,
    private locations: LocationsService,
    private zone: NgZone,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.getLocations();
    // datawedge scan
    DataWedge.addListener('scan', (event) => {
      this.zebraScan(event.data);
    });
  }

  onLocationChange(event: any) {
    this.selectedLocation = event.target.value;
  }

  // Gets all locations
  async getLocations() {
    try {
      const response: any = await firstValueFrom(
        await this.locations.getLocations()
      );
      this.locationList = response.results;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  // Scan with datawedge
  async zebraScan(code: string) {
    // zone is used to update the UI
    this.zone.run(() => {
      this.scannedCode = code;
      
    });
    this.getProductByBarcode(this.scannedCode);
  }

  // Scan with camera
  async cameraScan() {
    // gets a barcode from the camera

    // const result = await CapacitorBarcodeScanner.scanBarcode({
    //   hint: CapacitorBarcodeScannerTypeHint.ALL}
    // )
    // this.scannedCode = result.ScanResult;

    //hard coded for testing
    this.scannedCode = '800089975445';

    this.getProductByBarcode(this.scannedCode);
  }

  // get product by barcode
  async getProductByBarcode(barcode: string) {
    try {
      const result = await this.articleService.getArticleByBarcode(barcode);
      this.scannedProduct = await firstValueFrom(result);
      await this.articleService.saveArticle(this.selectedLocation, this.scannedProduct.id);
    } catch (error) {
      console.error('Error:', error);
      await this.toastService.presentToast(
        'Fout',
        'Product niet gevonden',
        'top',
        'danger',
        2000
      );
    }
  } 

  // Clear page method implementation
  async clearPage() {
    // Keep selected action and location
    const currentAction = this.selectedAction;
    const currentLocation = this.selectedLocation;
    console.log('Location:', currentLocation)

    // Reset other values
    this.scannedCode = '';
    this.scannedProduct = null;
    this.productID = null;

    // Restore selected values
    this.selectedAction = currentAction;
    this.selectedLocation = currentLocation;
  }
}
