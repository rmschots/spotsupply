import { Component, ElementRef } from '@angular/core';
import {
  PageScrollConfig,
  PageScrollInstance,
  PageScrollOptions,
  PageScrollService
} from 'ng2-page-scroll/ng2-page-scroll';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { BeachModel } from '../shared/framework/models/beach.model';
import { Beach } from '../shared/objects/beach/beach';
import { LocationModel } from '../shared/framework/models/location.model';
import { LocationPermissionStatus } from '../shared/objects/position/location-permission-status';
import { ShoppingCartModel } from '../shared/framework/models/shopping-cart.model';
import { Unsubscribable } from '../shared/components/unsubscribable';
import { Router } from '@angular/router';
import { DataStatus } from '../shared/services/gateway/data-status';

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

  atBeach: Beach;
  private _lastKnownPosition: Position;
  private _marker: google.maps.Marker;

  constructor(private pageScrollService: PageScrollService,
              private elRef: ElementRef,
              private navigationService: NavigationService,
              private _locationModel: LocationModel,
              private _beachModel: BeachModel,
              private _shoppingCartModel: ShoppingCartModel,
              private _router: Router) {
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
          this.atBeach = atBeach;
        } else {
          this.atBeach = null;
        }
        this.displayUserLocation();
      });
  }

  get beaches() {
    return this._beachModel.beaches$;
  }

  isChecking(): boolean {
    return this._locationModel.isWatchingPosition();
  }

  get ordered() {
    return this._shoppingCartModel.ordered$;
  }

  get hasCart() {
    return this._shoppingCartModel.cartAvailable$.map(status => status === DataStatus.AVAILABLE);
  }

  checkIt() {
    this._locationModel.startFetchingLocation();
  }

  onMapReady(map: google.maps.Map) {
    this.map = map;
    const bermudaTriangle = new google.maps.Polygon({
      paths: this._beachModel.getBeachCoordinates(this.selectedSpot),
      strokeColor: '#673ab7',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#673ab7',
      fillOpacity: 0.35
    });
    map.fitBounds(this.getAreaBounds(bermudaTriangle.getPaths()));
    bermudaTriangle.setMap(map);
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
        let pageScrollOptions: PageScrollOptions = {
          document: document,
          scrollTarget: '#' + spot.name,
          scrollingViews: [this.elRef.nativeElement.parentElement],
          pageScrollOffset: 15,
          pageScrollDuration: 0
        };
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(pageScrollOptions);
        this.pageScrollService.start(pageScrollInstance);
      }, 1);
    }
  }

  displayUserLocation() {
    if (this.map && this._lastKnownPosition) {
      let gPos = new google.maps.LatLng(this._lastKnownPosition.coords.latitude, this._lastKnownPosition.coords.longitude);
      if (this._marker) {
        this._marker.setMap(null);
      }
      this._marker = new google.maps.Marker({
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
    this._shoppingCartModel.createShoppingCart(this.atBeach.id);
    this._shoppingCartModel.cartAvailable$
      .filter(status => [DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(status))
      .take(1)
      .subscribe(status => {
        if (status === DataStatus.AVAILABLE) {
          this._router.navigate(['/store']);
        }
      });
  }

  private getAreaBounds(paths: google.maps.MVCArray): google.maps.LatLngBounds {
    let bounds = new google.maps.LatLngBounds();
    let path;
    for (var i = 0; i < paths.getLength(); i++) {
      path = paths.getAt(i);
      for (var ii = 0; ii < path.getLength(); ii++) {
        bounds.extend(path.getAt(ii));
      }
    }
    return bounds;
  }
}
