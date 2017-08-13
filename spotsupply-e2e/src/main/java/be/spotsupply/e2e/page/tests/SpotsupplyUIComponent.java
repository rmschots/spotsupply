package be.spotsupply.e2e.page.tests;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.*;

public interface SpotsupplyUIComponent {

    default void click(SelenideElement el) {
        el.shouldBe(present, visible, enabled).click();
    }

    default void sendKeys(SelenideElement el, CharSequence text) {
        text.chars().mapToObj(i -> (char) i).forEachOrdered(character -> {
            el.sendKeys(String.valueOf(character));
            sleep(20);
        });

    }

    default void sleep(long time) {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
