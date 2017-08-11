import { Component, OnInit } from '@angular/core';
import { RestGatewayService } from '../../shared/services/gateway/rest-gateway.service';
import { URLSearchParams } from '@angular/http';
import { MdDialog, MdSnackBar } from '@angular/material';
import { LoadingDialogComponent } from '../../shared/components/loading/loading-dialog.component';
import { Statistics } from '../../shared/objects/admin/statistics';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  moduleId: module.id,
  selector: 'ss-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statistics$: BehaviorSubject<Statistics[]> = new BehaviorSubject(null);
  amountOfUsers: number = 100;
  amountOfOrders: number = 100;

  constructor(private _restGateway: RestGatewayService,
              private _dialog: MdDialog,
              private _snackBar: MdSnackBar) {
  }

  get latestStatistics$() {
    return this.statistics$.map(st => !!st ? st[0] : null);
  }

  ngOnInit(): void {
    this.getStatistics();
  }

  addDummyUsers() {
    const dialogRef = this._dialog.open(LoadingDialogComponent, { data: 'Adding dummy users' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('amount', '' + this.amountOfUsers);
    this._restGateway.get('/testData/addDummyUsers', params)
      .take(1)
      .subscribe(() => {
        console.log('success');
        dialogRef.close();
        this.doSnackBar('added ' + this.amountOfUsers + ' dummy users');
      }, (error: Error) => {
        console.log('error');
        dialogRef.close();
        this.doSnackBar('failed adding users');
      });
  }

  addDummyOrders() {
    const dialogRef = this._dialog.open(LoadingDialogComponent, { data: 'Adding dummy orders' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('amount', '' + this.amountOfOrders);
    this._restGateway.get('/testData/addDummyOrders', params)
      .take(1)
      .subscribe(() => {
        console.log('success');
        dialogRef.close();
        this.doSnackBar('added ' + this.amountOfUsers + ' dummy users');
      }, (error: Error) => {
        console.log('error');
        dialogRef.close();
        this.doSnackBar('added ' + this.amountOfUsers + ' dummy users');
      });
  }

  refreshStatistics() {
    const dialogRef = this._dialog.open(LoadingDialogComponent, { data: 'Recalculating statistics of today' });
    this._restGateway.get('/statistics/refresh')
      .take(1)
      .subscribe(data => {
        let allStatistics = data.json() as Statistics[];
        this.statistics$.next(allStatistics);
        dialogRef.close();
      }, () => {
        this.statistics$.next(null);
        dialogRef.close();
        this.doSnackBar('failed recalculating statistics of today');
      });
  }

  private getStatistics() {
    this._restGateway.get('/statistics')
      .take(1)
      .subscribe(data => {
        let allStatistics = data.json() as Statistics[];
        this.statistics$.next(allStatistics);
      }, () => {
        this.statistics$.next(null);
      });
  }

  private doSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
