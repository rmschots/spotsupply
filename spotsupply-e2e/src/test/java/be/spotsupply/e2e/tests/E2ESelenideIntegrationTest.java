package be.spotsupply.e2e.tests;

import be.spotsupply.e2e.page.tests.pages.HomePage;
import com.codeborne.selenide.junit.ScreenShooter;
import org.junit.Rule;
import org.junit.rules.RuleChain;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public abstract class E2ESelenideIntegrationTest extends E2EIntegrationTest {

    @Rule
    public RuleChain chain = RuleChain
            .outerRule(new SelenideConfigurationRule())
            .around(ScreenShooter.failedTests().to("target/screenshots/"));

    protected HomePage loginAsAdmin() {
        return testApplication.openSpotsupply().loginAsAdmin();
    }

    protected String formatLocalDate(LocalDate localDate) {
        return localDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
    }
}
