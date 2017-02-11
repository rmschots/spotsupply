import { join } from 'path';
import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

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

        /* Enable typeless compiler runs (faster) between typed compiler runs. */
        // this.TYPED_COMPILE_INTERVAL = 5;

        // Add `NPM` third-party libraries to be injected/bundled.
        this.NPM_DEPENDENCIES = [
            ...this.NPM_DEPENDENCIES,
            // {src: 'bootstrap/dist/js/bootstrap.js', inject: 'libs'},
            {src: 'bootstrap/dist/css/bootstrap.css', inject: true},
            {src: '@angular/material/core/theming/prebuilt/deeppurple-amber.css', inject: true},
            {src: 'font-awesome/css/font-awesome.css', inject: true}
        ];

        // Add `local` third-party libraries to be injected/bundled.
        this.APP_ASSETS = [
            ...this.APP_ASSETS,
            // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
            // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
        ];

        this.addPackageBundles({
            name: '@ng-bootstrap/ng-bootstrap',
            path: 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            packageMeta: {
                main: 'index.js',
                defaultExtension: 'js'
            }
        });

        this.addPackageBundles({
            name: '@angular/material',
            path: 'node_modules/@angular/material/bundles/material.umd.js',
            packageMeta: {
                main: 'index.js',
                defaultExtension: 'js'
            }
        });

        /* Add to or override NPM module configurations: */
        // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
    }

}
