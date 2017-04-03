import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../app.service';
import { AuthenticationService, AlertService } from '../../services';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: `./login.component.html`

})
export class LoginComponent implements OnInit {
  formData: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.formData.username, this.formData.password)
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}

