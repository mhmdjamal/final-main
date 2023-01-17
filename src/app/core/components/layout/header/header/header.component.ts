import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  onSignupClicked() {
    this.router.navigate(['/auth/signup']);
  }
  onLoggedoutClicked() {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
