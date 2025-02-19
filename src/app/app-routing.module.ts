import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin', 
    pathMatch: 'full',
    data: { hideHeader: true },
  },
  {
    path: '',
    loadChildren: () => import('./pages/secure/secure.module').then(m => m.SecureModule),
    canActivate: [AuthGuard] // Secure all child pages
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/public/sign-in/sign-in.module').then(m => m.SignInPageModule),
    // canActivate: [PublicGuard], // Prevent for signed in users
    data: { hideHeader: true },
  },
  {
    path:'forgot-password',
    loadChildren: () => import('./pages/public/forgot-pw/forgot-pw.module').then(m => m.ForgotPwPageModule),
    canActivate: [PublicGuard], // Prevent for signed in users
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
