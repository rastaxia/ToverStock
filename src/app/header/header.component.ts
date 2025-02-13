import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }


  signOut() {
    this.authService.signOut() 
    }
}
