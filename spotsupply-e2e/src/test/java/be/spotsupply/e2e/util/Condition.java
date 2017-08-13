package be.spotsupply.e2e.util;

import java.util.concurrent.TimeoutException;

public class Condition {

    private Runnable runnable;
    private Throwable exceptionToThrowAfterTimeout = new TimeoutException();

    public Condition(Runnable runnable) {
        this.runnable = runnable;
    }

    public Condition(final Assertion assertion) {
        this.runnable = () -> {
            try {
                assertion.run();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
    }

    public boolean validate() {
        try {
            runnable.run();
            return true;
        } catch (Throwable e) {
            exceptionToThrowAfterTimeout = e;
            return false;
        }
    }

    public Throwable throwableToThrowAfterTimeout() {
        return exceptionToThrowAfterTimeout;
    }
}
