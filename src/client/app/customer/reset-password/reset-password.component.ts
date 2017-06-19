import { AfterViewInit, Component } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { LoginModel } from '../../shared/framework/models/login.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestGatewayService } from '../../shared/services/gateway/rest-gateway.service';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';
import { MdSnackBar } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent implements AfterViewInit {

  private static _TIMER_START = 5;

  isReset: boolean = false;
  errorMessage: string;
  timerCount: number = 5;

  password: string;
  passwordConfirmation: string;

  verificationCode: any;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _navigationService: NavigationService,
              private _restGateway: RestGatewayService,
              private _loginModel: LoginModel,
              private _snackBar: MdSnackBar) {
    _navigationService.setTitle('resetPassword');
  }

  ngAfterViewInit() {
    this._route.params
      .switchMap((params: Params) => {
        this.verificationCode = params['verificationCode'];
        let sParams: URLSearchParams = new URLSearchParams();
        sParams.set('verificationCode', params['verificationCode']);
        return this._restGateway.post('/account/validateResetPasswordVerification', {}, sParams);
      }).take(1)
      .subscribe(
        null,
        (error) => {
          this.verificationCode = null;
          this.errorMessage = error.message;
        }
      );

  }

  onSubmit() {
    this._loginModel.resetPassword(this.verificationCode, this.password)
      .take(1)
      .subscribe(() => {
          this.isReset = true;
          Observable.timer(1000, 1000)
            .map(i => ResetPasswordComponent._TIMER_START - i)
            .take(ResetPasswordComponent._TIMER_START + 1)
            .subscribe(i => this.timerCount = i
              , null
              , () => {
                this._router.navigate(['/']);
              });
        },
        (error) => {
          let errorMessage: string;
          if (error.errors && error.errors.length > 0) {
            errorMessage = error.errors[0].defaultMessage;
          } else {
            errorMessage = error.message;
          }
          this._snackBar.open(errorMessage, null, {
            duration: 2000
          });
        }
      );
  }
}
