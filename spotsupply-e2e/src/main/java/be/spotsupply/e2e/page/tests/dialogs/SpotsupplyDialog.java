package be.spotsupply.e2e.page.tests.dialogs;

import be.spotsupply.e2e.page.tests.SpotsupplyUIComponent;
import be.spotsupply.e2e.page.tests.pages.PageWithDialog;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.hidden;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public abstract class SpotsupplyDialog<S extends SpotsupplyDialog, D extends PageWithDialog<D>> implements SpotsupplyUIComponent {

    final D pageWithDialog;

    public abstract SelenideElement dialogIdentifier();

    SpotsupplyDialog(D pageWithDialog) {
        this.pageWithDialog = pageWithDialog;
        dialogIdentifier().shouldBe(visible);
    }

    public D close() {
        dialogIdentifier().shouldBe(hidden);
        return pageWithDialog;
    }

}
