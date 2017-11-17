package be.spotsupply.e2e.page.tests.pages;

import be.spotsupply.e2e.page.tests.SpotsupplyUIComponent;
import be.spotsupply.e2e.page.tests.dialogs.LoginDialog;

import static com.codeborne.selenide.Condition.hidden;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public interface PageWithSidenav<S extends PageWithSidenav<S>> extends SpotsupplyUIComponent, PageWithDialog<S> {

    @SuppressWarnings("unchecked")
    default S openSidenav() {
        $("#sidenav").shouldBe(hidden);
        click($("#sidenav-button"));
        $("#sidenav").shouldBe(visible);
        return (S) this;
    }

    default LoginDialog<S> sidenavClickLogin() {
        $("#sidenav").shouldBe(visible);
        click($("#login-nav-button"));
        return openLoginDialog();
    }

    @SuppressWarnings("unchecked")
    default S assertSidenavIsClosed() {
        $("#sidenav").shouldBe(hidden);
        return (S) this;
    }
}
