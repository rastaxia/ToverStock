import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  private scanSubject = new BehaviorSubject<string>('');
  public scan$ = this.scanSubject.asObservable();

  setScan(scannedCode: string) {
    this.scanSubject.next(scannedCode);
  }

  constructor() {}
}
