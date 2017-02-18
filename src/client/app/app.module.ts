import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpModule, Http } from "@angular/http";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { SettingsModule } from "./settings/settings.module";
import { HomeModule } from "./home/home.module";
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { Ng2MapModule } from "ng2-map";
import { Ng2PageScrollModule } from "ng2-page-scroll/ng2-page-scroll";
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from "ng2-translate";
import { ProductListModule } from "./product-list/product-list.module";
import { FAQModule } from "./faq/faq.module";
import { ContactModule } from "./contact/contact.module";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
    SettingsModule,
    HomeModule,
    ProductListModule,
    FAQModule,
    ContactModule,
    SharedModule.forRoot(),
    MaterialModule.forRoot(),
    Ng2MapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBtYO0eJfiqw2AqMRu-0_X8gBVSUWiIymg' +
      '&libraries=visualization,places,drawing',
    }),
    Ng2PageScrollModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
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
