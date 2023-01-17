import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sectors } from 'src/app/core/interfaces/sector.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SectorsService } from 'src/app/core/services/sectors.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Sectors>([]);
  dataSource2 = new MatTableDataSource<Sectors>([]);
  displayedColumns = ['key', 'name', 'categoryName', 'color'];
  userData: any;
  loading = true;
  name = '';
  logo = '';
  color = '';
  categoryName = '';

  constructor(
    private _sectorsService: SectorsService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getuserInfo();
    this.getAllData();
    this.getRequestedData();
  }

  getuserInfo() {
    this._authService.userInfo.subscribe(user => {
      this.userData = user;
      if (this.userData.role) {
        if (this.userData.role === 'admin') {
          this.displayedColumns.push('actions');
          //this.displayedColumns.push('view');
        }
        this.getAllData();
      }
    });
  }

  getAllData() {
    console.log('hiiiiiiiiiiiiiiiiiiiiii');

    this._sectorsService.getAll().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource._updateChangeSubscription();
        this.loading = false;
      }
    });
  }

  getRequestedData() {
    this._sectorsService.getAllRequsted().subscribe((result: any) => {
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
  onEditClicked(row: Sectors) {
    this.router.navigate(['/sectors/update-sector'], {
      queryParams: {
        key: row.key
      }
    });
  }

  getById(key: any) {
    this._sectorsService.getById(key).subscribe((result: any) => {
      this.name = result.name;
      this.logo = result.logo;
      this.color = result.color;
      this.categoryName = result.categoryName;
    });
  }

  onApprovedClicked(row: Sectors) {
    Swal.fire({
      title: 'Approved!',
      text: 'Do you want to Approve this request?',
      icon: 'success',
      confirmButtonText: 'Approve'
    }).then(result => {
      if (result.isConfirmed) {
        this._sectorsService.create({
          name: row.name,
          logo: row.logo,
          color: row.color,
          categoryName: row.categoryName
        });
        this._sectorsService.deleteRequsted(row.key).then(() => {
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

  onRejectedClicked(row: Sectors) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Reject'
    }).then(result => {
      if (result.isConfirmed) {
        this._sectorsService.deleteRequsted(row.key).then(() => {
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

  onDeleteClicked(row: Sectors) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this._sectorsService.delete(row.key).then(() => {
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
    this.router.navigate(['/sectors/add-sector']);
  }

  onRowClicked(row: Sectors) {
    this.router.navigate(['/sectors/preview-sector'], {
      queryParams: {
        key: row.key
      }
    });
  }

  onRequestNewStartup() {
    this.router.navigate(['/sectors/request-sector']);
  }
}
