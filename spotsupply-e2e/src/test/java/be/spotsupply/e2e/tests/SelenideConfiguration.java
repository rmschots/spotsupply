package be.spotsupply.e2e.tests;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

public class SelenideConfiguration {
    private static Logger LOGGER = LoggerFactory.getLogger(SelenideConfiguration.class);
    public static final int SELENIDE_TIMEOUT = 10000;

    private SelenideConfiguration() {
    }

    public static void configure() {
        Configuration.browser = "chrome";
        System.setProperty("selenide.browser", "chrome");
        getChromeDriverLocationFromEnvironment().ifPresent((location) -> System.setProperty("webdriver.chrome.driver", location));
        WebDriverRunner.getAndCheckWebDriver().manage().window().maximize();
        resetSelenideTimeouts();
    }

    private static Optional<String> getChromeDriverLocationFromEnvironment() {
        Optional<String> webdriverChromeDriverProperty = getProperty("webdriver.chrome.driver");
        return webdriverChromeDriverProperty.isPresent() ? webdriverChromeDriverProperty : bepaalChromeDriver();
    }

    public static Optional<String> bepaalChromeDriver() {
        return getProperty("CHROMEDRIVER_HOME") != null ?
                getProperty("CHROMEDRIVER_HOME").map((prop) -> prop + "/chromedriver")
                : Optional.empty();
    }

    private static Optional<String> getProperty(String propertyName) {
        return System.getProperty(propertyName) != null ? Optional.ofNullable(System.getProperty(propertyName)) : Optional.ofNullable(System.getenv(propertyName));
    }

    public static void resetSelenideTimeouts() {
        setSelenideTimeouts(10000);
    }

    public static void setSelenideTimeouts(int millis) {
        Configuration.timeout = (long) millis;
        Configuration.collectionsTimeout = (long) millis;
    }
}