import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  current_year: number = new Date().getFullYear();

  signIn_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    // Setup form
    this.signIn_form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  // Sign in
  async signIn() {
    const val = this.signIn_form.value;
    this.submit_attempt = true;

    // If email or password empty
    if (val.username == '' || val.password == '') {
      this.toastService.presentToast(
        'Fout',
        'Vul je gebruikersnaam en wachtwoord in',
        'top',
        'danger',
        2000
      );
    } else {
      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: 'Aanmelden Een moment geduld...',
        spinner: 'crescent',
      });

      // wait while verifying
      await loading.present();

      try {
        // Sign in
        const response = await this.authService.signIn(
          val.username,
          val.password
        );
        loading.dismiss();
        this.signIn_form.reset();
      } catch (error) {
        loading.dismiss();
      }
    }
  }
}
