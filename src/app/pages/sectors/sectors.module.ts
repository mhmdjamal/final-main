import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSectorComponent } from './pages/add-sector/add-sector.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RequestComponent } from './pages/request/request.component';
import { UpdateSectorComponent } from './pages/update-sector/update-sector.component';
import { SectorComponent } from './sector/sector.component';
import { SectorsRoutingModule } from './sectors-routing.module';

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
    SectorComponent,
    AddSectorComponent,
    PreviewComponent,
    RequestComponent,
    UpdateSectorComponent
  ],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    ...MatImports,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SectorsModule {}
