import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { HomeRoutingModule } from './home-routing.module';
import { PreviewStartupComponent } from './preview-startup/preview-startup.component';
import { StartupComponent } from './startup/startup.component';

@NgModule({
  declarations: [StartupComponent, PreviewStartupComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    OverlayModule,
    ShareButtonsModule
  ]
})
export class HomeModule {}
