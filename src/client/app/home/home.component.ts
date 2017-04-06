import { ChangeDetectorRef, Component, ElementRef, Inject, Provider, ViewChild } from '@angular/core';
import { Ng2MapComponent } from 'ng2-map';
import { PageScrollConfig, PageScrollInstance, PageScrollService } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { LocationService } from '../shared/services/location/location.service';
import { Http } from '@angular/http';
import { AsyncService } from '../shared/framework/async-services/base.async-service';
import { SpotsupplyAPIService } from '../shared/framework/async-services/rest-api/rest-api.async-service';
import { Gateway } from '../shared/framework/gateways/base.gateway';
import { RestfulGateway } from '../shared/framework/gateways/restful.gateway';

const providers: Provider[] = [

  // Here we override the AsyncService multi-provider and
  // introduce the GameP2PService service.
  // This way we're using both GameServer and
  // GameP2PService and so the user can send progress to both
  // the application server and the user she is connected with.
  { provide: AsyncService, multi: true, useClass: SpotsupplyAPIService },

  // Without lazy-loading it doesn't matter where we declare
  // the WebRTCGateway, Gateway and WS_CONFIG. However, notice that
  // these provider are required by the GameP2PService
  // so they should be available in the part of the component tree where
  // we want to render the MultiPlayerComponent.
  { provide: Gateway, useClass: RestfulGateway },
  { provide: RestfulGateway, useExisting: Gateway }
];

@Component({
  moduleId: module.id,
  selector: 'ss-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers
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
              private locationService: LocationService,
              private _restfulGateway: RestfulGateway) {
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
