import { Component, ViewChild } from '@angular/core';
import { Ng2MapComponent, NavigatorGeolocation } from 'ng2-map';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})

export class HomeComponent {

    @ViewChild('someVar') ng2MapComponent: Ng2MapComponent;

    public map: google.maps.Map;

    spots: string[] = ['OOSTENDE', 'ANDERE BADPLAATS'];

    selectedSpot: string;

    lat: number = 51.678418;
    lng: number = 7.809007;

    private geolocation: NavigatorGeolocation;

    constructor(geolocation: NavigatorGeolocation) {
        this.geolocation = geolocation;
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
                    this.geolocation.getCurrentPosition().subscribe(
                        (location) => {
                            this.map.setCenter(new google.maps.LatLng(location.coords.latitude, location.coords.longitude));
                        },
                        (error) => {
                            console.error(error);
                        });
                });
            }, 1);
        }
    }

    determineLocation() {
        console.log(this.map.getCenter());
    }
}
