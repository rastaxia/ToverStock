import { AfterContentChecked, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';


@Component({
  standalone: false,
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomePage implements AfterContentChecked {


  ngAfterContentChecked(): void {
    
  }

}
