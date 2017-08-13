package be.spotsupply.e2e.page.tests.pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$;

public class HomePage extends SpotsupplyPage<HomePage> {

    @Override
    public SelenideElement pageIdentifier() {
        return $("#homepage");
    }
}
