package be.spotsupply.e2e.page.tests.pages;

import com.codeborne.selenide.SelenideElement;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.FindBys;

import java.util.List;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static org.assertj.core.api.Assertions.assertThat;

public class OrderHistoryPage extends SpotsupplyPage<OrderHistoryPage> implements SettingsPage {

    @FindBy(css = "md-expansion-panel-header[id^='order-history-cart-']")
    private List<SelenideElement> cartElements;

    @Override
    public SelenideElement pageIdentifier() {
        return $("#orderhistorypage");
    }

    public OrderHistoryPage assertHasCart(long cartId) {
        $("#order-history-cart-" + cartId).shouldBe(visible);
        return this;
    }

    public OrderHistoryPage assertAmountOfCarts(int amountOfCarts) {
        assertThat(cartElements).hasSize(amountOfCarts);
        return this;
    }
}
