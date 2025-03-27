import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, firstValueFrom } from 'rxjs';
import { LocationsService } from 'src/app/services/product-service/locations.service';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ScanService } from 'src/app/services/scan.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ActionService } from 'src/app/services/product-service/action.service';
import { NavigationEnd, Router } from '@angular/router';

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
    private zone: NgZone,
    private scanService: ScanService,
    private actionService: ActionService,
    private locations: LocationsService,
    private articleService: ArticleService,
    private toastService: ToastService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getLocations();
    this.selectedAction = localStorage.getItem('selectedAction') || '';
    this.selectedLocation = parseInt(localStorage.getItem('selectedLocation') || '0');
    this.actionService.selectedAction$.subscribe((action) => {
      this.selectedAction = action;
    });
    this.scanService.scan$.subscribe((scannedCode) => {
      if (scannedCode) {
        this.zone.run(() => {
          
          this.scannedCode = scannedCode;
          this.getProductByBarcode(this.scannedCode);
        });
      }
    });

  }

  // When entering the page 
  ionViewWillEnter() {
    this.selectedAction = localStorage.getItem('selectedAction') || '';
    this.selectedLocation = parseInt(localStorage.getItem('selectedLocation') || '0', 10);

  }


  // Action chn
  onLocationChange(event: any) {
    this.selectedLocation = event.target.value;
    this.saveLocation(event.target.value);
  }

  onActionChange(event: any) {
    this.selectedAction = event.target.value;
    this.saveSelection(event.target.value);

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
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL}
    )
    this.scannedCode = result.ScanResult;

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

    // Reset other values
    this.scannedCode = '';
    this.scannedProduct = null;
    this.productID = null;

    // Restore selected values
    this.selectedAction = currentAction;
    this.selectedLocation = currentLocation;
  }

  saveSelection(action: string){
    localStorage.setItem('selectedAction', action);
  }

  saveLocation(location: number){
    localStorage.setItem('selectedLocation', location.toString())
  }

}
