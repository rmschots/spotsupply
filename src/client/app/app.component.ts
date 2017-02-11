import { Component } from '@angular/core';
import { Config } from './shared/index';
import { Ng2MapComponent } from 'ng2-map';
import './operators';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'app.component.html',
})

export class AppComponent {
    constructor() {
        console.log('Environment config', Config);
        (<any>Ng2MapComponent)['apiUrl'] = 'https://maps.google.com/maps/api/js?key=AIzaSyBtYO0eJfiqw2AqMRu-0_X8gBVSUWiIymg';
    }
}
