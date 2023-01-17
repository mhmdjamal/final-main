import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavMenuDto } from 'src/app/core/dto/nav-menu';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  navMenu: NavMenuDto;
  userData: any;
  isLoggedIn: boolean = false;
  loading = true;
  snav: any;
  constructor(
    private breakpoint: BreakpointObserver,
    private _sideNav: SidenavService,
    private _authService: AuthService,
    public router: Router
  ) {
    this.navMenu = this._sideNav.getNavMenu();
  }

  ngAfterViewInit(): void {
    // this.breakpoint
    //   .observe(['(max-width:46.875rem'])
    //   .pipe(delay(1))
    //   .subscribe((value: BreakpointState) => {
    //     if (value.matches) {
    //       this.sidenav.mode = 'over';
    //       this.sidenav.close();
    //     } else {
    //       this.sidenav.mode = 'side';
    //       this.sidenav.open();
    //     }
    //   });
  }

  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn;
    this.getuserInfo();
  }
  getuserInfo() {
    this._authService.userInfo.subscribe(user => {
      this.userData = user;
      console.log(this.userData);

      if (this.userData.role) {
        this.loading = false;
        this.isLoggedIn = this._authService.isLoggedIn;
      }
    });
  }
  OnLoginClick() {
    this.router.navigate(['/auth/login']);
  }
  onSignupClicked() {
    this.router.navigate(['/auth/login']);
  }

  onLoggedoutClicked() {
    this._authService.logout();

    this.getuserInfo();
  }
}
