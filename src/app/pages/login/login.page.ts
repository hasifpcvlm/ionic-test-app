import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.action';
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
      this.onRecoveredPasswordFail(loginstate);
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
    this.router.navigate(['home']);
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
      this.store.dispatch(show());
      this.subscription = this.authService.recoverPassword(this.loginForm.value.email).subscribe(res => {
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({ error }));
      });
    }
  }

  private async onRecoveredPassword(loginstate: loginState) {
    if (loginstate.isRecoweredPassword) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery password sent',
        color: 'primary',
        duration: 3000
      });
      toaster.present();
    }
  }

  private async onRecoveredPasswordFail(loginstate: loginState) {
    if (loginstate.error) {
      this.store.dispatch(hide());
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
