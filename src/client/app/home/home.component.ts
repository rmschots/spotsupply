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

  atBeach: Beach;

  mapCenter: google.maps.LatLng;
  mapZoom: number = 13;

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

  get distanceToBeachAvailable() {
    return this._locationModel.distanceToBeachAvailable$
      .map(status => {
        return status === DataStatus.AVAILABLE;
      });
  }

  get isNotAtBeach() {
    return this._locationModel.atBeachAvailable$.map(status => {
      return status === DataStatus.UNAVAILABLE;
    });
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
    if (!this.mapCenter && !this.mapZoom) {
      this.mapCenter = new google.maps.LatLng(10, 10);
      this.mapZoom = 10;
    }
    this.map = map;
    const beachPolygon = new google.maps.Polygon({
      paths: this._beachModel.getBeachCoordinates(this.selectedSpot),
      strokeColor: '#673ab7',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#673ab7',
      fillOpacity: 0.35
    });
    map.fitBounds(BeachModel.getAreaBounds(beachPolygon.getPaths()));
    this.mapCenter = map.getCenter();
    this.mapZoom = map.getZoom();
    beachPolygon.setMap(map);
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
          url: '/assets/img/ic_person_pin_circle_black_48px.svg'
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

  getBeachDistance(beachId: number): string {
    let distanceMeter = this._locationModel.getBeachDistance(beachId);
    if (distanceMeter === 0) {
      return '';
    }
    if (distanceMeter < 1000) {
      return Math.round(distanceMeter) + ' m';
    } else if (distanceMeter < 10000) {
      return Math.round(distanceMeter / 100) / 10 + ' km';
    }
    return Math.round(distanceMeter / 1000) + ' km';
  }
}
