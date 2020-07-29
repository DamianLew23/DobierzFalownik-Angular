import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../core/authentication/auth.service';
import {TokenStorageService} from '../../../../core/authentication/token-storage.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (user: User) => {
        this.tokenStorage.saveToken(user.accessToken);
        this.tokenStorage.saveUser(user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/admin/dashboard']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
