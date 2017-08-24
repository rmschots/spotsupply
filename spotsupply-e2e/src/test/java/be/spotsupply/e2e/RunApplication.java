package be.spotsupply.e2e;

import be.spotsupply.e2e.application.proxy.SpotsupplyProxy;
import be.spotsupply.e2e.application.tomcat.SpotsupplyTomcat;
import be.spotsupply.e2e.page.tests.pages.HomePage;
import be.spotsupply.e2e.util.Assertion;
import be.spotsupply.e2e.util.Poller;
import com.codeborne.selenide.Selenide;
import com.jayway.restassured.specification.RequestSpecification;
import org.hamcrest.CoreMatchers;

import static com.codeborne.selenide.Selenide.page;
import static com.jayway.restassured.RestAssured.given;
import static com.jayway.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.core.IsNot.not;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

public class RunApplication {

    private static RunApplication instance = null;

    private final SpotsupplyTomcat tomcat;
    private final SpotsupplyProxy proxy;
    private final String baseUri = "http://localhost";
    private boolean started = false;

    private RunApplication() {
        tomcat = SpotsupplyTomcat.getInstance();
        proxy = SpotsupplyProxy.getInstance();
    }

    public String baseUri() {
        return baseUri;
    }

    public int port() {
        return proxy.port();
    }

    public int backendPort() {
        return tomcat.getPort();
    }

    public String contextPath() {
        return tomcat.contextPath();
    }

    public String spotsupplyUrl() {
        return baseUri() + ":" + port();
    }

    public RunApplication start() {
        if (!started) {
            startTomcat();
            startProxy();
            waitUntilStarted();
            verifyHealth();
            started = true;
        }
        return this;
    }

    private void startTomcat() {
        tomcat.start();
    }

    private void startProxy() {
        proxy.start();
    }

    private void waitUntilStarted() {
        Poller.aPoller()
            .doAssert((Assertion) () ->
                givenAuthenticatedRequest()
                    .when()
                    .get(contextPath() + "/health")
                    .then()
                    .assertThat()
                    .statusCode(not(NOT_FOUND.value()))
            );
    }

    private void verifyHealth() {
        System.out.println("Verifying health...");
        givenAuthenticatedRequest()
            .when()
            .get(contextPath() + "/health")
            .then()
            .assertThat()
            .statusCode(OK.value())
            .contentType(JSON)
            .body(CoreMatchers.not(containsString("DOWN")));
        System.out.println("Health OK!");
    }

    private RequestSpecification givenAuthenticatedRequest() {
        return given()
//                .header(TimTamPreAuthenticatedProcessingFilter.VDABAUTHORIZATION_HEADER_NAME, "cn=CONSULENT,ou=users,ou=intern,o=vdab")
            .baseUri(baseUri())
            .port(backendPort());
    }

    public HomePage openSpotsupply() {
        Selenide.open(spotsupplyUrl());
        return page(HomePage.class);
    }

    public static RunApplication getInstance() {
        if (instance == null)
            instance = new RunApplication();
        return instance;
    }

    public static void main(String[] args) {
        RunApplication.getInstance().start();
    }
}
