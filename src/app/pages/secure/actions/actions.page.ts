import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LocationsService } from 'src/app/services/product-service/locations.service';
import { DataWedge } from 'capacitor-datawedge';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ArticleService } from 'src/app/services/product-service/article.service';

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
  selectedLocation: string;
  scannedCode: string = '';
  
  productID = 0;
  scannedProduct: any;

  constructor(
    private articleService : ArticleService,
    private locations: LocationsService,
    private zone: NgZone
  ) {
    this.selectedAction = '';
    this.selectedLocation = '';
  }

  
  ngOnInit() {
    this.getLocations();
    // datawedge scan
    DataWedge.addListener('scan', event => {
      this.zebraScan(event.data);
    });
  }

  onActionChange() {
    console.log('Selected action:', this.selectedAction);
  }

  onLocationChange(event: any) {
    console.log('Selected location:', event.target.value);
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
    this.zone.run(() => {
    this.scannedCode = code;  
    });
    
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
   const result = this.articleService.getArticleByBarcode(barcode);
   console.log('result here:',  firstValueFrom(await  result));
  }


}
