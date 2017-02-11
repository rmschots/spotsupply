import { Component } from '@angular/core';


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

    spots: string[] = ['OOSTENDE', 'ANDERE BADPLAATS'];

    selectedSpot: string;

    lat: number = 51.678418;
    lng: number = 7.809007;

    constructor() {
    }

    selectSpot(spot: string) {
        if (this.selectedSpot === spot) {
            this.selectedSpot = null;
        } else {
            this.selectedSpot = spot;
        }
    }
}
