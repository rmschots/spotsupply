package be.spotsupply.e2e.page.tests.pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$;

public class CurrentOrderPage extends SpotsupplyPage<CurrentOrderPage> {

    @Override
    public SelenideElement pageIdentifier() {
        return $("#currentorderpage");
    }

}
