import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { Ng2MapComponent, NavigatorGeolocation } from 'ng2-map';
import { PageScrollService, PageScrollInstance, PageScrollConfig } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent {

    map: google.maps.Map;

    spots: string[] = ['OOSTENDE', 'ANDERE BADPLAATS'];

    selectedSpot: string;

    lat: number = 51.678418;
    lng: number = 7.809007;

    @ViewChild('someVar') private ng2MapComponent: Ng2MapComponent;

    constructor(private geolocation: NavigatorGeolocation,
                private pageScrollService: PageScrollService,
                @Inject(DOCUMENT) private document: Document,
                private elRef: ElementRef) {
        PageScrollConfig.defaultDuration = 0;
    }

    selectSpot(spot: string) {
        if (this.selectedSpot === spot) {
            this.selectedSpot = null;
            this.map = null;

        } else {
            this.map = null;
            this.selectedSpot = spot;
            setTimeout(() => {
                this.ng2MapComponent.mapReady$.subscribe((map: google.maps.Map) => {
                    this.map = map;
                    this.geolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).subscribe(
                        (location) => {
                            let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
                            this.map.setCenter(latLng);
                            new google.maps.Marker({
                                position: latLng,
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
                        },
                        (error) => {
                            console.error(error);
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

    determineLocation() {
        console.log(this.map.getCenter());
    }
}
