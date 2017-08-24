package be.spotsupply.e2e.page.tests.pages;

import be.spotsupply.e2e.page.tests.SpotsupplyUIComponent;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.page;

public interface SettingsPage extends SpotsupplyUIComponent {

    default CurrentOrderPage clickCurrentOrderTab() {
        click($("#current-order-tab"));
        return page(CurrentOrderPage.class);
    }

    default OrderHistoryPage clickOrderHistoryTab() {
        click($("#order-history-tab"));
        return page(OrderHistoryPage.class);
    }


    default PreferencesPage clickPreferencesTab() {
        click($("#preferences-tab"));
        return page(PreferencesPage.class);
    }
}
