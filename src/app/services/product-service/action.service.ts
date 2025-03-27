import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { }

  private selectedAction = new BehaviorSubject<string>(localStorage.getItem('selectedAction') || '');
  selectedAction$ = this.selectedAction.asObservable();

  setSelectedAction(action: string) {
    localStorage.setItem('selectedAction', action);
    this.selectedAction.next(action);
  }
}
