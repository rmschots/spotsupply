import { Component } from '@angular/core';
import { ShoppingCartModel } from '../../shared/framework/models/shopping-cart.model';
import { Beach } from '../../shared/objects/beach/beach';
import { LocationModel } from '../../shared/framework/models/location.model';
import { Unsubscribable } from '../../shared/components/unsubscribable';
import { BeachModel } from '../../shared/framework/models/beach.model';

@Component({
  moduleId: module.id,
  selector: 'ss-current-order',
  templateUrl: 'current-order.component.html',
  styleUrls: ['current-order.component.css']
})
export class CurrentOrderComponent extends Unsubscribable {

  map: google.maps.Map;
  atBeach: Beach;

  mapCenter: google.maps.LatLng;
  mapZoom: number = 13;

  private _lastKnownPosition: Position;
  private _marker: google.maps.Marker;

  constructor(private _shoppingCartModel: ShoppingCartModel,
              private _locationModel: LocationModel) {
    super();
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

  onMapReady(map: google.maps.Map) {
    if (!this.mapCenter && !this.mapZoom) {
      this.mapCenter = new google.maps.LatLng(10, 10);
      this.mapZoom = 10;
    }
    this.map = map;
    const beachPolygon = new google.maps.Polygon({
      paths: this.atBeach.coordinates,
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

  completeOrder() {
    this._shoppingCartModel.completeOrder();
  }

  get cartRequestedTime() {
    return this._shoppingCartModel.shoppingCart$.map(cart => cart.requestedTime);
  }

  get cart() {
    return this._shoppingCartModel.shoppingCart$;
  }

  get ordered() {
    return this._shoppingCartModel.ordered$;
  }

  private displayUserLocation() {
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
}
