import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/secure/secure.module').then(m => m.SecureModule),
    canActivate: [AuthGuard] // Zorgt ervoor dat alleen ingelogde gebruikers hier komen
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/public/sign-in/sign-in.module').then(m => m.SignInPageModule),
    data: { hideHeader: true },
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/public/forgot-pw/forgot-pw.module').then(m => m.ForgotPwPageModule),
    data: { hideHeader: true },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
