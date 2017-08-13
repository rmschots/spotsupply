package be.spotsupply.e2e.page.tests.pages;

import be.spotsupply.e2e.page.tests.SpotsupplyUIComponent;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.visible;

public abstract class SpotsupplyPage<S extends SpotsupplyPage<S>> implements PageWithSidenav<S>, SpotsupplyUIComponent {

    public abstract SelenideElement pageIdentifier();

    SpotsupplyPage() {
        pageIdentifier().shouldBe(visible);
    }

    public S loginAsAdmin() {
        return openSidenav()
                .sidenavClickLogin()
                .loginAsAdmin()
                .assertSidenavIsClosed();
    }
}
