package be.spotsupply.e2e.tests.customer;

import be.spotsupply.e2e.tests.E2ESelenideIntegrationTest;
import org.junit.Test;

public class LoginAsCustomerEndToEndTest extends E2ESelenideIntegrationTest {

    @Test
    public void loginTest() {
        loginAsCustomer();
    }
}
