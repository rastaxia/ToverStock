import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//forms 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//header
import { HeaderComponent } from './header/header.component';
import { provideHttpClient } from '@angular/common/http';

// modal controller
import { ModalComponent } from './services/modal-controller/modal.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ModalComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
