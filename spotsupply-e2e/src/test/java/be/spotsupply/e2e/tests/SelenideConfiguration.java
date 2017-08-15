package be.spotsupply.e2e.tests;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SelenideConfiguration {
    private static Logger LOGGER = LoggerFactory.getLogger(SelenideConfiguration.class);
    public static final int SELENIDE_TIMEOUT = 10000;

    @Value("${envTarget:dev}")
    private String environment;


    private SelenideConfiguration() {
    }

    private static final ChromeOptions getChromeOptions(boolean withUI) {
        Map<String, String> mobileEmulation = new HashMap<>();
        mobileEmulation.put("deviceName", "iPhone 5");

        ChromeOptions options = new ChromeOptions();
        if (!withUI) {
            options.addArguments("headless", "disable-gpu");
        }
        options.setExperimentalOption("mobileEmulation", mobileEmulation);

        return options;
    }

    public static void configure() {
        Configuration.browser = "chrome";
        System.setProperty("selenide.browser", "chrome");

        getChromeDriverLocationFromEnvironment().ifPresent((location) -> System.setProperty("webdriver.chrome.driver", location));

        boolean withUI = System.getProperty("os.name").toLowerCase().contains("windows");
        DesiredCapabilities capabilities = DesiredCapabilities.chrome();
        capabilities.setCapability(ChromeOptions.CAPABILITY, getChromeOptions(withUI));
        WebDriver chromeDriver = new ChromeDriver(capabilities);
        WebDriverRunner.setWebDriver(chromeDriver);

        if (withUI) {
            chromeDriver.manage().window().maximize();
        } else {
            Configuration.startMaximized = false;
        }
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