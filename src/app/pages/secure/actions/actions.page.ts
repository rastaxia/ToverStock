import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {

  constructor(
    private AuthService: AuthService
  ) { }

  ngOnInit() {
  }

  async verifyToken() {
    await this.AuthService.verifyToken();
  }

}
