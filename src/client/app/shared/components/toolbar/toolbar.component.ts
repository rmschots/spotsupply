import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Language } from './language';
import { NavigationService } from '../../services/navigation/navigation.service';
import { LanguageService } from '../../services/language/language.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { LocationModel } from '../../framework/models/location.model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';
import { Unsubscribable } from '../unsubscribable';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  moduleId: module.id,
  selector: 'ss-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent extends Unsubscribable {

  @Output() openMenu = new EventEmitter<boolean>();
  @Input() menuOpen: boolean = false;

  title: string;
  languages: Language[];
  selectedLanguage: Language;
  productsAmount = 0;
  showCart = false;
  showOrder = false;
  error: string;

  constructor(private navigationService: NavigationService,
              private languageService: LanguageService,
              private router: Router,
              private shoppingCartService: ShoppingCartService,
              private _locationModel: LocationModel,
              private _shoppingCartModel: ShoppingCartModel) {
    super();
    this.title = this.navigationService.getTitle();
    this.languages = languageService.getLanguages();
    this.selectedLanguage = languageService.getActiveLanguage();
    this.productsAmount = shoppingCartService.getProductsAmount();

    navigationService.titleSubscription((title: string) => {
      this.title = title;
    });
    languageService.languageSubscription(language => {
      this.selectedLanguage = language;
    });
    _shoppingCartModel.productAmount$.takeUntil(this._ngUnsubscribe$)
      .subscribe(amt => {
        this.productsAmount = amt;
      });
    _locationModel.permission$.takeUntil(this._ngUnsubscribe$)
      .subscribe(permissionStatus => {
        if (permissionStatus === LocationPermissionStatus.DENIED) {
          this.error = 'map.errorCode.' + LocationPermissionStatus.DENIED;
        } else {
          this.error = null;
        }
      });
    combineLatest(_shoppingCartModel.hasCart$, _shoppingCartModel.ordered$, _locationModel.atBeach$)
      .takeUntil(this._ngUnsubscribe$)
      .subscribe(latestValues => {
        const [hasCart, ordered, atBeach] = latestValues;
        this.showCart = hasCart && !ordered && !!atBeach;
        this.showOrder = hasCart && ordered;
      });
  }

  menuOpened() {
    if (!this.menuOpen) {
      this.menuOpen = true;
      this.openMenu.next();
    }
  }

  goToCart() {
    this.router.navigate(['/store']);
  }

  goToOrder() {
    this.router.navigate(['/settings/current-order']);
  }

  languageSelected(language: Language) {
    this.languageService.setLanguage(language);
  }
}

