package be.spotsupply.e2e.page.tests.pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$;

public class PreferencesPage extends SpotsupplyPage<PreferencesPage> implements SettingsPage {

    @Override
    public SelenideElement pageIdentifier() {
        return $("#preferencespage");
    }

}
