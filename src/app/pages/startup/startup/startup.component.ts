import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { StartupsService } from 'src/app/core/services/startups.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Startup>([]);
  dataSource2 = new MatTableDataSource<Startup>([]);

  displayedColumns = ['name', 'emailAddress', 'sectors', 'city'];
  userData: any;
  loading = true;
  constructor(
    private _startupsService: StartupsService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getuserInfo();
    this.getAllData();
    this.getAllRequestedData();
  }

  getuserInfo() {
    this._authService.userInfo.subscribe(user => {
      this.userData = user;
      if (this.userData.role) {
        if (this.userData.role === 'admin') {
          this.displayedColumns.push('actions');
          this.displayedColumns.push('view');
        }
        this.getAllData();
      }
    });
  }

  onRejectedClicked(row: Startup) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Reject'
    }).then(result => {
      if (result.isConfirmed) {
        this._startupsService.deleteRequsted(row.key).then(() => {
          Swal.fire({
            title: 'rejected',
            text: 'Successfully rejected the request',
            icon: 'success'
          });
        });
      } else {
        Swal.fire({
          title: 'OK as you like!',
          text: 'no action will be taken!',
          icon: 'warning'
        });
      }
    });
  }

  onApprovedClicked(row: Startup) {
    Swal.fire({
      title: 'Approved!',
      text: 'Do you want to Approve this request?',
      icon: 'success',
      confirmButtonText: 'Approve'
    }).then(result => {
      if (result.isConfirmed) {
        this._startupsService.create({
          name: row.name,
          logo: row?.logo,
          emailAddress: row.emailAddress,
          websiteUrl: row.websiteUrl,
          sectors: row.sectors,
          city: row.city,
          numberOfEmployees: row.numberOfEmployees,
          yearOfEstablish: row.yearOfEstablish,
          description: row.description
        });
        this._startupsService.deleteRequsted(row.key).then(() => {
          Swal.fire({
            title: 'approved',
            text: 'Successfully approved the request',
            icon: 'success'
          });
        });
      } else {
        Swal.fire({
          title: 'OK as you like!',
          text: 'no action will be taken!',
          icon: 'warning'
        });
      }
    });
  }

  getAllData() {
    this._startupsService.getAll().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
        this.loading = false;
      }
    });
  }

  getAllRequestedData() {
    this._startupsService.getAllRequsted().subscribe((result: any) => {
      if (result) {
        this.dataSource2 = new MatTableDataSource(result);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2._updateChangeSubscription();
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
  onEditClicked(row: Startup) {
    this.router.navigate(['/startup/update-startup'], {
      queryParams: {
        key: row.key
      }
    });
  }
  onDeleteClicked(row: Startup) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this._startupsService.delete(row.key).then(() => {
          Swal.fire({
            title: 'deleted',
            text: 'Successfully deleted',
            icon: 'success'
          });
        });
      } else {
        Swal.fire({
          title: 'OK as you like!',
          text: 'no action will be taken!',
          icon: 'warning'
        });
      }
    });
  }

  onAddClicked() {
    this.router.navigate(['/startup/add-startup']);
  }

  onRowClicked(row: Startup) {
    this.router.navigate(['/startup/preview-startup'], {
      queryParams: {
        key: row.key
      }
    });
  }

  onRequestNewStartup() {
    this.router.navigate(['/startup/request-startup']);
  }
}
