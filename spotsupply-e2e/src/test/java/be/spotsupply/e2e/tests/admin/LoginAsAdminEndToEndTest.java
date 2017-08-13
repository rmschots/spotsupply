package be.spotsupply.e2e.tests.admin;

import be.spotsupply.e2e.tests.E2ESelenideIntegrationTest;
import org.junit.Test;

public class LoginAsAdminEndToEndTest extends E2ESelenideIntegrationTest {

    @Test
    public void loginTest() {
        loginAsAdmin();
    }
}
