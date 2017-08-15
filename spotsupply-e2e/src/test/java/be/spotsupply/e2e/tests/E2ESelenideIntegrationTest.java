package be.spotsupply.e2e.tests;

import be.spotsupply.e2e.page.tests.pages.HomePage;
import com.codeborne.selenide.WebDriverRunner;
import com.codeborne.selenide.junit.ScreenShooter;
import org.junit.Rule;
import org.junit.rules.RuleChain;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import static be.spotsupply.e2e.tests.util.Geolocation.GEOLOCATION_OVERRIDE;

public abstract class E2ESelenideIntegrationTest extends E2EIntegrationTest {

    @Rule
    public RuleChain chain = RuleChain
        .outerRule(new SelenideConfigurationRule())
        .around(ScreenShooter.failedTests().to("target/screenshots/"));

    protected static ChromeDriver webdriver() {
        return (ChromeDriver) WebDriverRunner.getWebDriver();
    }

    protected void setInOostende() {
        setLocation(51.235143, 2.915432);
    }

    protected void setLocation(double latitude, double longitude) {
        webdriver().executeScript(String.format(Locale.US, GEOLOCATION_OVERRIDE, latitude, longitude));
        webdriver().executeScript("navigator.geolocation='lolo'");
    }

    protected HomePage loginAsAdmin() {
        return testApplication.openSpotsupply().loginAsAdmin();
    }

    protected HomePage loginAsCustomer() {
        return testApplication.openSpotsupply().loginAsCustomer();
    }

    protected String formatLocalDate(LocalDate localDate) {
        return localDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
    }
}
