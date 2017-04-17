import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { PageScrollConfig, PageScrollInstance, PageScrollService } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { LocationService } from '../shared/services/location/location.service';
import { BeachModel } from '../shared/framework/models/beach.model';
import { Beach } from '../shared/objects/beach/beach';

@Component({
  moduleId: module.id,
  selector: 'ss-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [BeachModel]
})

export class HomeComponent implements OnInit {

  map: google.maps.Map;
  spots: Array<Beach> = [];
  selectedSpot: number;
  overlayError: PositionError = null;

  private _lastKnownPosition: Position;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: Document,
              private elRef: ElementRef,
              private changeDetector: ChangeDetectorRef,
              private navigationService: NavigationService,
              private locationService: LocationService,
              private _beachModel: BeachModel) {
    navigationService.setTitle('home');
    PageScrollConfig.defaultDuration = 0;
    this.locationService.positionSubscription(position => {
      this._lastKnownPosition = position;
      this.selectSpot(this.spots[0]);
      this.displayUserLocation();
    });
    this.locationService.positionErrorSubscription(positionError => {
      this.overlayError = positionError;
      this.changeDetector.detectChanges();
    });
    _beachModel.beaches$.subscribe(beaches => {
      this.spots = beaches;
    });
  }

  ngOnInit(): void {
    this._beachModel.loadBeaches();
  }

  checkIt() {
    this.locationService.startFetchingLocation();
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
          this.document,
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
}
