import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Language } from './language';
import { NavigationService } from '../../services/navigation/navigation.service';
import { LanguageService } from '../../services/language/language.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { LocationModel } from '../../framework/models/location.model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';

@Component({
  moduleId: module.id,
  selector: 'ss-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {

  @Output() openMenu = new EventEmitter<boolean>();
  @Input() menuOpen: boolean = false;

  title: string;
  languages: Language[];
  selectedLanguage: Language;
  productsAmount = 0;
  showCart = false;
  error: string;

  private isOrdered = false;
  private isInBounds = false;

  constructor(private navigationService: NavigationService,
              private languageService: LanguageService,
              private router: Router,
              private shoppingCartService: ShoppingCartService,
              private _locationModel: LocationModel) {
    this.title = this.navigationService.getTitle();
    this.languages = languageService.getLanguages();
    this.selectedLanguage = languageService.getActiveLanguage();
    this.productsAmount = shoppingCartService.getProductsAmount();
    _locationModel.atBeach$.subscribe(beach => {
      this.isInBounds = !!beach;
      this.updateShowCart();
    });

    navigationService.titleSubscription((title: string) => {
      this.title = title;
    });
    languageService.languageSubscription(language => {
      this.selectedLanguage = language;
    });
    shoppingCartService.productsAmountSubscription(amt => {
      this.productsAmount = amt;
    });
    shoppingCartService.orderedSubscription(isOrdered => {
      this.isOrdered = isOrdered;
      this.updateShowCart();
    });
    _locationModel.permission$.subscribe(permissionStatus => {
      if (permissionStatus === LocationPermissionStatus.DENIED) {
        this.error = 'map.errorCode.' + LocationPermissionStatus.DENIED;
      } else {
        this.error = null;
      }
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

  languageSelected(language: Language) {
    this.languageService.setLanguage(language);
  }

  private updateShowCart() {
    this.showCart = !this.isOrdered && this.isInBounds;
  }
}

