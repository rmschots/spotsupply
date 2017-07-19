import { Component } from '@angular/core';
import { RestGatewayService } from '../../shared/services/gateway/rest-gateway.service';
import { URLSearchParams } from '@angular/http';
import { MdDialog, MdSnackBar } from '@angular/material';
import { LoadingDialogComponent } from '../../shared/components/loading/loading-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'ss-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {

  amountOfUsers: number = 100;
  amountOfOrders: number = 100;

  constructor(private _restGateway: RestGatewayService,
              private _dialog: MdDialog,
              private _snackBar: MdSnackBar) {
  }

  addDummyUsers() {
    const dialogRef = this._dialog.open(LoadingDialogComponent, { data: 'Adding dummy users'});
    let params: URLSearchParams = new URLSearchParams();
    params.set('amount', '' + this.amountOfUsers);
    this._restGateway.get('/testData/addDummyUsers', params)
      .take(1)
      .subscribe(() => {
        console.log('success');
        dialogRef.close();
        this.doSnackBar('added '+this.amountOfUsers+' dummy users');
      }, (error: Error) => {
        console.log('error');
        dialogRef.close();
        this.doSnackBar('failed adding users');
      });
  }

  addDummyOrders() {
    const dialogRef = this._dialog.open(LoadingDialogComponent, { data: 'Adding dummy orders'});
    let params: URLSearchParams = new URLSearchParams();
    params.set('amount', '' + this.amountOfOrders);
    this._restGateway.get('/testData/addDummyOrders', params)
      .take(1)
      .subscribe(() => {
        console.log('success');
        dialogRef.close();
        this.doSnackBar('added '+this.amountOfUsers+' dummy users');
        this._snackBar.open('added '+this.amountOfOrders+' dummy orders', null, {
          duration: 2000,
        });
      }, (error: Error) => {
        console.log('error');
        dialogRef.close();
        this.doSnackBar('added '+this.amountOfUsers+' dummy users');
        this._snackBar.open('failed adding orders', null, {
          duration: 2000,
        });
      });
  }

  private doSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
