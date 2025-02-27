import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ModalComponent } from './services/modal-controller/modal.component';
import { AuthInterceptor } from './guards/auth.interceptor';
import { MicroSentryModule } from '@micro-sentry/angular';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ModalComponent],
  imports: [
    MicroSentryModule.forRoot({
      dsn: "https://0fbf99c160d54371acc1bf6016362c40@tracker.back-bone.nl/11"
    }),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
