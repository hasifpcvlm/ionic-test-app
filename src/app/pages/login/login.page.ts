import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import {
  recoverPassword, recoverPasswordFail,
  recoverPasswordSuccess, loginFail, loginSuccess, loggingIn
} from 'src/store/login/login.action';
import { loginState } from 'src/store/login/loginState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscription: Subscription;

  constructor(private router: Router,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService) { }

  ngOnInit() {
    this.prepareForm();
    this.store.select('login').subscribe(loginstate => {
      this.onRecoveringPassword(loginstate);
      this.onRecoveredPassword(loginstate);

      this.onLoggingIn(loginstate);
      this.isLoggedIn(loginstate);

      this.onError(loginstate);
      this.toggleLoading(loginstate);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public forgotEmailPassword(): void {
    this.store.dispatch(recoverPassword());
  }

  public login(): void {
    this.store.dispatch(loggingIn());
    // this.router.navigate(['home']);
  }

  public register(): void {
    this.router.navigate(['register']);
  }

  private prepareForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  private onRecoveringPassword(loginstate: loginState) {
    if (loginstate.isRecoweringPassword) {
      this.subscription = this.authService.recoverPassword(this.loginForm.value.email).subscribe(res => {
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({ error }));
      });
    }
  }

  private async onRecoveredPassword(loginstate: loginState) {
    if (loginstate.isRecoweredPassword) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery password sent',
        color: 'primary',
        duration: 3000
      });
      toaster.present();
    }
  }

  private toggleLoading(login: loginState) {
    if (login.isLoggingIn || login.isRecoweringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onLoggingIn(login: loginState) {
    if (login.isLoggingIn) {
      this.authService.loggingIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(user => {
        this.store.dispatch(loginSuccess({ user }));
      }, error => {
        this.store.dispatch(loginFail({ error }));
      });
    }
  }

  private isLoggedIn(login: loginState) {
    if (login.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  private async onError(loginstate) {
    if (loginstate.error) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginstate.error.message,
        color: 'danger',
        duration: 3000
      });
      toaster.present();
    }
  }

}
