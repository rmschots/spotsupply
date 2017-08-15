package be.spotsupply.e2e.tests.customer;

import be.spotsupply.e2e.page.tests.pages.HomePage;
import be.spotsupply.e2e.tests.E2ESelenideIntegrationTest;
import org.junit.Before;

public abstract class CustomerSelenideEndToEndTest extends E2ESelenideIntegrationTest {

    protected HomePage homePage;

    @Before
    public void loginCustomer() {
        homePage = loginAsCustomer();
        setInOostende();
    }
}
