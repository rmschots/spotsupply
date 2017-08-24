package be.spotsupply.domain.model.common;

public class TranslationTestData {

    public static Translation.TranslationBuilder aTranslation(String text) {
        return Translation.builder()
            .textDutch(text)
            .textEnglish(text)
            .textFrench(text);
    }
}
