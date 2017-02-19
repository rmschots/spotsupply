import { Component, ViewChild, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Ng2MapComponent, NavigatorGeolocation } from 'ng2-map';
import { PageScrollService, PageScrollInstance, PageScrollConfig } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
import { PositionError } from './position-error';
import { NavigationService } from '../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  map: google.maps.Map;

  spots: string[] = ['OSTEND', 'OTHER_BEACH'];

  selectedSpot: string;

  lat: number = 51.678418;
  lng: number = 7.809007;

  overlayError: PositionError = null;

  @ViewChild('someVar') private ng2MapComponent: Ng2MapComponent;

  private lastKnownPosition: google.maps.LatLng;

  constructor(private geolocation: NavigatorGeolocation,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: Document,
              private elRef: ElementRef,
              private changeDetector: ChangeDetectorRef,
              private navigationService: NavigationService) {
    navigationService.setTitle('home');
    PageScrollConfig.defaultDuration = 0;
  }

  selectSpot(spot: string) {
    if (this.selectedSpot === spot) {
      this.selectedSpot = null;
      this.map = null;

    } else {
      this.map = null;
      this.overlayError = null;
      this.selectedSpot = spot;
      setTimeout(() => {
        this.ng2MapComponent.mapReady$.subscribe((map: google.maps.Map) => {
          this.map = map;
          this.displayUserLocation();
          this.geolocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: true}).subscribe(
            (location) => {
              this.lastKnownPosition = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
              this.displayUserLocation();
            },
            (error: PositionError) => {
              console.error(error);
              this.updateLocationError(error);
            });
        });
      }, 1);
      setTimeout(() => {
        console.log(this.elRef.nativeElement.parentElement);
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineInstance(
          this.document,
          '#' + this.selectedSpot,
          this.elRef.nativeElement.parentElement);
        this.pageScrollService.start(pageScrollInstance);
      }, 1);
    }
  }

  displayUserLocation() {
    if (this.map && this.lastKnownPosition) {
      this.map.setCenter(this.lastKnownPosition);
      new google.maps.Marker({
        position: this.lastKnownPosition,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          strokeColor: '#106cc8',
          strokeOpacity: 0.5,
          strokeWeight: 10
        },
        draggable: true,
        map: this.map
      });
    }
  }

  private updateLocationError(error: PositionError) {
    let type: string = null;
    switch (error.code) {
      case PositionError.PERMISSION_DENIED:
        type = 'error';
        break;
      case PositionError.POSITION_UNAVAILABLE:
      case PositionError.TIMEOUT:
        type = 'warning';
        break;
    }
    error.type = type;
    this.overlayError = error;
    this.changeDetector.detectChanges();

  }
}
