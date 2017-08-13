package be.spotsupply.e2e.tests;

import org.junit.rules.TestRule;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

public class SelenideConfigurationRule implements TestRule {
    public SelenideConfigurationRule() {
    }

    public Statement apply(Statement base, Description description) {
        SelenideConfiguration.configure();
        return base;
    }
}

