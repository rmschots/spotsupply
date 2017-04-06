import { join } from 'path';
import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**'
  ];

  constructor() {
    super();
    this.APP_TITLE = 'SpotSupply';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'bootstrap/dist/js/bootstrap.js', inject: 'libs'},
      // {src: 'bootstrap/dist/css/bootstrap.css', inject: true},
      {src: '@angular/material/core/theming/prebuilt/deeppurple-amber.css', inject: true},
      {src: 'font-awesome/css/font-awesome.css', inject: true},
      {src: 'hammerjs/hammer.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.addPackagesBundles([{
      name: '@angular/material',
      path: 'node_modules/@angular/material/bundles/material.umd.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }, {
      name: 'ng2-map',
      path: 'node_modules/ng2-map/dist/index.js',
      packageMeta: {
        main: 'ng2-map.umd.js',
        defaultExtension: 'js'
      }
    }, {
      name: 'ng2-page-scroll/ng2-page-scroll',
      path: 'node_modules/ng2-page-scroll/bundles/ng2-page-scroll.umd.js',
      packageMeta: {
        main: 'ng2-page-scroll.js',
        defaultExtension: 'js'
      }
    }, {
      name: 'ng2-translate',
      path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js',
      packageMeta: {
        main: 'ng2-translate.js',
        defaultExtension: 'js'
      }
    }, {
      name: 'typescript-collections',
      path: 'node_modules/typescript-collections/dist/lib/index.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }, {
      name: '@ngrx/store',
      path: 'node_modules/@ngrx/store/bundles/store.umd.js'
    }, {
      name: '@ngrx/core',
      path: 'node_modules/@ngrx/core/bundles/core.umd.js'
    }, {
      name: 'immutable',
      path: 'node_modules/immutable/dist/immutable.js'
    }, {
      name: 'simple-peer',
      path: 'node_modules/simple-peer/simplepeer.min.js'
    }]);

    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add proxy middlewar */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')({ ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
