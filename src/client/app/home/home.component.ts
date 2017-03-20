import { Component, ViewChild, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Ng2MapComponent } from 'ng2-map';
import { PageScrollService, PageScrollInstance, PageScrollConfig } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { LocationService } from '../shared/services/location/location.service';

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

  private lastKnownPosition: Position;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: Document,
              private elRef: ElementRef,
              private changeDetector: ChangeDetectorRef,
              private navigationService: NavigationService,
              private locationService: LocationService) {
    navigationService.setTitle('home');
    PageScrollConfig.defaultDuration = 0;
    this.locationService.positionSubscription(position => {
      this.lastKnownPosition = position;
      this.selectSpot('OSTEND');
      this.displayUserLocation();
    });
    this.locationService.positionErrorSubscription(positionError => {
      this.overlayError = positionError;
      this.changeDetector.detectChanges();
    });
  }

  checkIt() {
    this.locationService.startFetchingLocation();
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
      let gPos = new google.maps.LatLng(this.lastKnownPosition.coords.latitude, this.lastKnownPosition.coords.longitude);
      this.map.setCenter(gPos);
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
}
