import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddStartupComponent } from './pages/add-startup/add-startup.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RequistComponent } from './pages/requist/requist.component';
import { UpdateStartupComponent } from './pages/update-startup/update-startup.component';
import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup/startup.component';

const MatImports = [
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    StartupComponent,
    AddStartupComponent,
    UpdateStartupComponent,
    PreviewComponent,
    RequistComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...MatImports
  ]
})
export class StartupModule {}
