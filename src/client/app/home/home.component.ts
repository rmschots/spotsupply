import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { PageScrollConfig, PageScrollInstance, PageScrollService } from 'ng2-page-scroll/ng2-page-scroll';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { BeachModel } from '../shared/framework/models/beach.model';
import { Beach } from '../shared/objects/beach/beach';
import { LocationModel } from '../shared/framework/models/location.model';
import { LocationPermissionStatus } from '../shared/objects/position/location-permission-status';
import { combineLatest } from 'rxjs/operator/combineLatest';
import { ShoppingCartModel } from '../shared/framework/models/shopping-cart.model';
import { Unsubscribable } from '../shared/components/unsubscribable';

@Component({
  moduleId: module.id,
  selector: 'ss-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [BeachModel]
})

export class HomeComponent extends Unsubscribable {

  map: google.maps.Map;
  selectedSpot: number;
  overlayError: string = null;

  private _lastKnownPosition: Position;

  constructor(private pageScrollService: PageScrollService,
              private elRef: ElementRef,
              private changeDetector: ChangeDetectorRef,
              private navigationService: NavigationService,
              private _locationModel: LocationModel,
              private _beachModel: BeachModel,
              private _shoppingCartModel: ShoppingCartModel) {
    super();
    navigationService.setTitle('home');
    PageScrollConfig.defaultDuration = 0;
    _locationModel.permission$.takeUntil(this._ngUnsubscribe$)
      .subscribe(locationPermissionStatus => {
        if (locationPermissionStatus === LocationPermissionStatus.DENIED) {
          this.overlayError = 'Could not determine location';
        } else {
          this.overlayError = null;
        }
      });
    _locationModel.lastKnownLocation$.takeUntil(this._ngUnsubscribe$)
      .subscribe(lastKnownLocation => {
        this._lastKnownPosition = lastKnownLocation;
        if (lastKnownLocation) {
          this.displayUserLocation();
        }
      });
    _locationModel.atBeach$.takeUntil(this._ngUnsubscribe$)
      .subscribe(atBeach => {
        if (atBeach) {
          this.selectedSpot = atBeach.id;
        } else {
          this.selectedSpot = null;
        }
        this.displayUserLocation();
      });
    combineLatest.call(_locationModel.lastKnownLocation$, _beachModel.beaches$)
      .takeUntil(this._ngUnsubscribe$)
      .subscribe(
        (latestValues: any) => {
          if (latestValues[0] && latestValues[1]) {
            _locationModel.setUserAtBeach(latestValues[1].get(0));
          }
        });
  }

  get beaches() {
    return this._beachModel.beaches$;
  }

  checkIt() {
    this._locationModel.startFetchingLocation();
  }

  onMapReady(map: google.maps.Map) {
    this.map = map;
    setTimeout(() => {
      this.displayUserLocation();
    }, 1);
  }

  selectSpot(spot: Beach) {
    if (this.selectedSpot === spot.id) {
      this.selectedSpot = null;
      this.map = null;
    } else {
      this.map = null;
      this.overlayError = null;
      this.selectedSpot = spot.id;
      setTimeout(() => {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineInstance(
          document,
          '#' + spot.name,
          this.elRef.nativeElement.parentElement);
        this.pageScrollService.start(pageScrollInstance);
      }, 1);
    }
  }

  displayUserLocation() {
    if (this.map && this._lastKnownPosition) {
      let gPos = new google.maps.LatLng(this._lastKnownPosition.coords.latitude, this._lastKnownPosition.coords.longitude);
      // this.map.setCenter(gPos);
      new google.maps.Marker({
        position: gPos,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          strokeColor: '#106cc8',
          strokeOpacity: 0.5,
          strokeWeight: 10
        },
        draggable: false,
        map: this.map
      });
    }
  }

  goToStore() {
    this._shoppingCartModel.createShoppingCart(this.selectedSpot);
  }
}
