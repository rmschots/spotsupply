package be.spotsupply.e2e.page.tests.dialogs;

import be.spotsupply.e2e.page.tests.pages.PageWithDialog;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.hidden;
import static com.codeborne.selenide.Selenide.$;

public class LoginDialog<S extends PageWithDialog<S>> extends SpotsupplyDialog<S> {

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin";
    private static final String CUSTOMER_USERNAME = "test";
    private static final String CUSTOMER_PASSWORD = "test";

    public LoginDialog(S pageWithDialog) {
        super(pageWithDialog);
    }

    @Override
    public SelenideElement dialogIdentifier() {
        return $("#login-dialog");
    }

    public S loginAsAdmin() {
        return loginWithCredentials(ADMIN_USERNAME, ADMIN_PASSWORD);
    }

    public S loginAsCustomer() {
        return loginWithCredentials(CUSTOMER_USERNAME, CUSTOMER_PASSWORD);
    }

    private S loginWithCredentials(String username, String password) {
        sendKeys($("#login-emailphone-input"), username);
        sendKeys($("#login-password-input"), password);
        click($("#login-loginbutton"));
        $("#login-dialog").shouldBe(hidden);
        return pageWithDialog;
    }
}
