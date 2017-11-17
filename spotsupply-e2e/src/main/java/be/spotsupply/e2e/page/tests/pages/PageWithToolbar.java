package be.spotsupply.e2e.page.tests.pages;

import be.spotsupply.e2e.page.tests.SpotsupplyUIComponent;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public interface PageWithToolbar<S extends PageWithToolbar<S>> extends SpotsupplyUIComponent {

    @SuppressWarnings("unchecked")
    default S assertToolbarHasWarningButton() {
        $("#toolbar-warning-button").shouldBe(visible);
        return (S) this;
    }
}
