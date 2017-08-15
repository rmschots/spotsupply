package be.spotsupply.e2e.page.tests.pages;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.support.FindBy;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.page;

public class HomePage extends SpotsupplyPage<HomePage> {

    @FindBy(css = "#checkit-button")
    private SelenideElement checkitButton;

    @FindBy(css = "#shopat-button")
    private SelenideElement shopatButton;

    @Override
    public SelenideElement pageIdentifier() {
        return $("#homepage");
    }

    public HomePage clickCheckitButton() {
        checkitButton.shouldBe(visible);
        checkitButton.click();
        return this;
    }

    public StorePage clickShoptatButton() {
        shopatButton.click();
        return page(StorePage.class);
    }

    public HomePage assertShopatButtonVisible() {
        shopatButton.shouldBe(visible);
        return this;
    }
}
