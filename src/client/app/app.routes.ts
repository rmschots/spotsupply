import { Routes } from '@angular/router';
import { SettingsRoutes } from './settings/index';
import { HomeRoutes } from './home/index';
import { ProductListRoutes } from './product-list/product-list.routes';
import { FAQRoutes } from './faq/faq.routes';
import { ContactRoutes } from './contact/contact.routes';

export const routes: Routes = [
  ...HomeRoutes,
  ...SettingsRoutes,
  ...ProductListRoutes,
  ...FAQRoutes,
  ...ContactRoutes
];
