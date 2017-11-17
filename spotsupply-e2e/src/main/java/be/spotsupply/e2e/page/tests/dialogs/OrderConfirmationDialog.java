package be.spotsupply.e2e.page.tests.dialogs;

import be.spotsupply.e2e.page.tests.pages.PageWithDialog;
import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.support.FindBy;

import static com.codeborne.selenide.Selenide.$;

public class OrderConfirmationDialog<S extends PageWithDialog<S>> extends SpotsupplyDialog<S> {

    @FindBy(css = "#orderconfirmation-button")
    private SelenideElement orderConfirmationButton;

    public OrderConfirmationDialog(S pageWithDialog) {
        super(pageWithDialog);
    }

    @Override
    public SelenideElement dialogIdentifier() {
        return $("#orderconfirmation-dialog");
    }

    public S confirm() {
        orderConfirmationButton.click();
        return pageWithDialog;
    }

}
