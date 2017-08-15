package be.spotsupply.e2e.tests.customer;

import be.spotsupply.e2e.page.tests.pages.CurrentOrderPage;
import org.junit.Test;

public class CreateOrderEndToEndTest extends CustomerSelenideEndToEndTest {

    @Test
    public void createOrder() {
        int amountOfProducts = 50;

        CurrentOrderPage orderInfoPage = homePage
            .clickCheckitButton()
            .assertShopatButtonVisible()
            .clickShoptatButton()
            .goToTab(0)
            .clickAddProduct(1, amountOfProducts)
            .assertAmountOfProduct(1, amountOfProducts)
            .assertTotalPrice(amountOfProducts * 2.5)
            .clickNextButton()
            .assertTotalPrice(amountOfProducts * 2.5)
            .assertDeliverytime("ASAP")
            .clickBringitButton()
            .confirm()
            .continueToCurrentOrderPage();
    }
}
