package be.spotsupply.e2e.page.tests.pages;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.support.FindBy;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.page;

public class CurrentOrderPage extends SpotsupplyPage<CurrentOrderPage> implements SettingsPage {

    @FindBy(id = "current-order-complete-order-button")
    private SelenideElement completeOrderButton;

    @Override
    public SelenideElement pageIdentifier() {
        return $("#currentorderpage");
    }

    public CurrentOrderPage clickCompleteOrderButton() {
        completeOrderButton.click();
        return this;
    }
}
