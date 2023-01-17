import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { StartupsService } from 'src/app/core/services/startups.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Startup>([]);

  displayedColumns = ['name', 'emailAddress'];
  userData: any;
  loading = true;
  constructor(
    private _startupsService: StartupsService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this._authService.getAll().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
        this.loading = false;
      }
    });
  }

  applyFilter($event: any) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
