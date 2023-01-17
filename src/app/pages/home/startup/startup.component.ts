import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  data: any;
  constructor(
    private _startupsService: StartupsService,
    private router: Router
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getAllData();
  }

  onRowClicked(row: Startup) {
    this.router.navigate(['/startup/preview-startup'], {
      queryParams: {
        key: row.key
      }
    });
  }

  getAllData() {
    this._startupsService.getAll().subscribe((result: any) => {
      if (result) {
        this.data = result;
      }
    });
  }
}
