import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoginSignupComponent } from '../auth/login-signup/login-signup.component';
import { HomeComponent } from '../home/home/home.component';
import { AddStartupComponent } from './pages/add-startup/add-startup.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RequistComponent } from './pages/requist/requist.component';
import { UpdateStartupComponent } from './pages/update-startup/update-startup.component';
import { StartupComponent } from './startup/startup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/startup',
    pathMatch: 'full'
  },
  {
    path: 'all-startup',
    component: StartupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-startup',
    component: AddStartupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-startup',
    component: UpdateStartupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'preview-startup',
    component: PreviewComponent
  },
  {
    path: 'request-startup',
    component: RequistComponent
  },
  { path: 'auth', component: LoginSignupComponent },
  { path: 'unauthorized', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule {}
