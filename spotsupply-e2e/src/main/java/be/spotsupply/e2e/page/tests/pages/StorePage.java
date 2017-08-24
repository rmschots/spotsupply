package be.spotsupply.e2e.page.tests.pages;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.support.FindBy;

import java.text.DecimalFormat;
import java.util.stream.IntStream;

import static com.codeborne.selenide.Condition.matchText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.page;

public class StorePage extends SpotsupplyPage<StorePage> {

    @FindBy(id = "store-product-total")
    private SelenideElement productTotal;

    @FindBy(id = "store-next-button")
    private SelenideElement nextButton;

    @FindBy(className = "mat-tab-header-pagination-before")
    private SelenideElement tabLeftButton;

    @FindBy(className = "mat-tab-header-pagination-after")
    private SelenideElement tabRightButton;

    @Override
    public SelenideElement pageIdentifier() {
        return $("#storepage");
    }

    public StorePage clickAddProduct(long productId, int times) {
        IntStream.range(0, times).forEach(i -> {
            $("#product-add-" + productId + "-button").click();
        });
        return this;
    }

    public StorePage assertAmountOfProduct(long productId, int amount) {
        $("#product-amount-" + productId).should(matchText(Integer.toString(amount)));
        return this;
    }

    public StorePage goToTab(long tabIndex) {
        $("#md-tab-label-0-" + tabIndex).click();
        return this;
    }

    public StorePage assertTotalPrice(double totalPrice) {
        DecimalFormat format = new DecimalFormat("0.#");
        productTotal.should(matchText(format.format(totalPrice)));
        return this;
    }

    public OrderInfoPage clickNextButton() {
        sleep(200);
        nextButton.click();
        sleep(200);
        return page(OrderInfoPage.class);
    }
}
