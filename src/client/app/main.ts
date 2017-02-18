import 'hammerjs/hammer';
import { enableProdMode } from '@angular/core';
// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Load i18n providers
// import { TranslationProviders } from './i18n.providers';
// The app module
import { AppModule } from './app.module';

if (String('<%= BUILD_TYPE %>') === 'prod') {
  enableProdMode();
}

// Compile and launch the module with i18n providers
// let TP = new TranslationProviders();
// TP.getTranslationFile().then((providers: any) => {
// const options: any = { providers };
platformBrowserDynamic().bootstrapModule(AppModule/*, options*/);
// });
