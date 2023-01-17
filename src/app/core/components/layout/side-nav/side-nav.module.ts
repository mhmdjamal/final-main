import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
const MatImports = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [SideNavComponent, FooterComponent],
  imports: [CommonModule, RouterModule, ...MatImports],
  exports: [SideNavComponent]
})
export class SideNavModule {}
