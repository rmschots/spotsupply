package be.spotsupply.e2e.page.tests.pages;

import be.spotsupply.e2e.page.tests.SpotsupplyUIComponent;
import be.spotsupply.e2e.page.tests.dialogs.LoginDialog;

import static com.codeborne.selenide.Selenide.page;

public interface PageWithDialog<S extends PageWithDialog<S>> extends SpotsupplyUIComponent {

    default LoginDialog<S> openLoginDialog() {
        return page(new LoginDialog<>((S) this));
    }
}
