import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Ng2MapModule } from 'ng2-map';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        AboutModule,
        HomeModule,
        SharedModule.forRoot(),
        MaterialModule.forRoot(),
        Ng2MapModule.forRoot({
            apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBtYO0eJfiqw2AqMRu-0_X8gBVSUWiIymg' +
            '&libraries=visualization,places,drawing',
        })
    ],
    declarations: [AppComponent],
    providers: [{
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }],
    bootstrap: [AppComponent]
})

export class AppModule {
}
