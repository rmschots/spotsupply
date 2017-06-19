import { AfterViewInit, Component } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestGatewayService } from '../../shared/services/gateway/rest-gateway.service';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  moduleId: module.id,
  selector: 'ss-verify-email',
  templateUrl: 'verify-email.component.html',
  styleUrls: ['verify-email.component.css']
})
export class VerifyEmailComponent implements AfterViewInit {

  private static _TIMER_START = 5;

  verified: boolean = false;
  errorMessage: string;
  timerCount: number = 5;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _navigationService: NavigationService,
              private _restGateway: RestGatewayService) {
    _navigationService.setTitle('verifyEmail');
  }

  ngAfterViewInit() {
    this._route.params
      .switchMap((params: Params) => {
        let sParams: URLSearchParams = new URLSearchParams();
        sParams.set('verificationCode', params['verificationCode']);
        return this._restGateway.post('/account/verify', {}, sParams);
      }).take(1)
      .subscribe(
        () => {
          this.verified = true;
          Observable.timer(1000, 1000)
            .map(i => VerifyEmailComponent._TIMER_START - i)
            .take(VerifyEmailComponent._TIMER_START + 1)
            .subscribe(i => this.timerCount = i
              , null
              , () => {
                this._router.navigate(['/']);
              });
        },
        (error) => this.errorMessage = error.message
      );

  }
}
