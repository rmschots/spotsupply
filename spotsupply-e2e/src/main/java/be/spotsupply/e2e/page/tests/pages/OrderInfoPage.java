package be.spotsupply.e2e.page.tests.pages;

import be.spotsupply.e2e.page.tests.dialogs.OrderConfirmationDialog;
import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.support.FindBy;

import java.text.DecimalFormat;

import static com.codeborne.selenide.Condition.hasAttribute;
import static com.codeborne.selenide.Condition.matchText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.page;

public class OrderInfoPage extends SpotsupplyPage<OrderInfoPage> {

    @FindBy(css = "#cart-total-amount")
    private SelenideElement totalPriceElement;

    @FindBy(css = "#bringit-button")
    private SelenideElement bringitButton;

    @FindBy(css = "#deliverytime-select")
    private SelenideElement deliverytimeSelect;

    @Override
    public SelenideElement pageIdentifier() {
        return $("#orderinfopage");
    }

    public OrderInfoPage assertTotalPrice(double totalPrice) {
        DecimalFormat format = new DecimalFormat("0.#");
        totalPriceElement.should(matchText(format.format(totalPrice)));
        return this;
    }

    public OrderInfoPage assertDeliverytime(String deliverytime) {
        deliverytimeSelect.should(hasAttribute("ng-reflect-model", deliverytime));
        return this;
    }

    public OrderConfirmationDialog<OrderInfoPage> clickBringitButton() {
        sleep(2000);
        bringitButton.click();
        return page(new OrderConfirmationDialog<>(this));
    }

    public CurrentOrderPage continueToCurrentOrderPage() {
        return page(CurrentOrderPage.class);
    }
}
