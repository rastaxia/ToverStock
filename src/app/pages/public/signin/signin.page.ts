import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signin_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {

    // Setup form
    this.signin_form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });

  }

  // Sign in
  async signIn() {
    const val = this.signin_form.value;
    this.submit_attempt = true;

    // If email or password empty
    if (val.username == '' || val.password == '') {
      this.toastService.presentToast('Fout', 'Vul je gebruikersnaam en wachtwoord in', 'top', 'danger', 2000);

    } else {

      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Aanmelden</p><span>Een moment geduld...</span>',
        spinner: 'crescent'
      });

      // wait while verifying
      await loading.present();

      try {
        // Sign in
        const response = await this.authService.signIn(val.username, val.password);
        
        loading.dismiss();
      } catch (error) {
        this.toastService.presentToast('Fout', 'Er is iets misgegaan. Probeer het opnieuw.', 'top', 'danger', 2000);
        loading.dismiss();
      }
      

    }
  }

}
