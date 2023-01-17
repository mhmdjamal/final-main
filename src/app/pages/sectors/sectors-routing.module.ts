import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoginSignupComponent } from '../auth/login-signup/login-signup.component';
import { HomeComponent } from '../home/home/home.component';
import { AddSectorComponent } from './pages/add-sector/add-sector.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RequestComponent } from './pages/request/request.component';
import { UpdateSectorComponent } from './pages/update-sector/update-sector.component';
import { SectorComponent } from './sector/sector.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-sectors',
    pathMatch: 'full'
  },
  {
    path: 'all-sectors',
    component: SectorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-sector',
    component: AddSectorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-sector',
    component: UpdateSectorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'preview-sector',
    component: PreviewComponent
  },
  {
    path: 'request-sector',
    component: RequestComponent
  },
  { path: 'auth', component: LoginSignupComponent },
  { path: 'unauthorized', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule {}
