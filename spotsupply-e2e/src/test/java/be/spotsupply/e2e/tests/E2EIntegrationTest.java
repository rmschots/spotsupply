package be.spotsupply.e2e.tests;

import be.spotsupply.domain.config.PersistenceJPAConfig;
import be.spotsupply.e2e.RunApplication;
import com.codeborne.selenide.WebDriverRunner;
import org.junit.After;
import org.junit.Before;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import java.util.Locale;

import static com.codeborne.selenide.WebDriverRunner.clearBrowserCache;

@SpringBootTest(classes = SpringBootTestApplication.class)
@ContextConfiguration(classes = {
    PersistenceJPAConfig.class
})
public abstract class E2EIntegrationTest extends AbstractJUnit4SpringContextTests {

    protected RunApplication testApplication;

    @Before
    public void doBefore() {
        Locale.setDefault(new Locale("en", "US"));
        testApplication = RunApplication.getInstance().start();
        clearBrowserCache();
    }

    @After
    public void doAfter() {
        WebDriverRunner.closeWebDriver();
    }
}
