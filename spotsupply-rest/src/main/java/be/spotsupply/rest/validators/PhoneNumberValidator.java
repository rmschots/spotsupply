package be.spotsupply.rest.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

    private static final Pattern PATTERN_PHONE1 = Pattern.compile("^\\+(\\d{2})(\\d{3})(\\d{6})$");
    private static final Pattern PATTERN_PHONE2 = Pattern.compile("^00(\\d{2})(\\d{3})(\\d{6})$");
    private static final Pattern PATTERN_PHONE3 = Pattern.compile("^0()(\\d{3})(\\d{6})$");

    @Override
    public void initialize(PhoneNumber phoneNumber) {
        // no initialization necessary
    }

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext constraintValidatorContext) {
        if (phoneNumber == null) {
            return false;
        }
        String[] splitPhone = splitPhone(phoneNumber);
        return validatePhonePrefix(splitPhone[0]) &&
                validatePhoneOperator(splitPhone[1]) &&
                validatePhoneSuffix(splitPhone[2]);
    }

    private boolean validatePhonePrefix(String prefix) {
        return prefix.isEmpty()
                || "32".equals(prefix);
    }

    private boolean validatePhoneOperator(String operator) {
        return operator.length() == 3
                && ("468".equals(operator)
                || operator.startsWith("47")
                || operator.startsWith("48")
                || operator.startsWith("49"));
    }

    private boolean validatePhoneSuffix(String suffix) {
        return suffix.length() == 6;
    }

    private String[] splitPhone(String phoneNumber) {
        String cleanNumber = phoneNumber.replaceAll("\\s", "");
        Matcher matcher;
        if (cleanNumber.startsWith("+")) {
            matcher = PATTERN_PHONE1.matcher(cleanNumber);
        } else if (cleanNumber.startsWith("00")) {
            matcher = PATTERN_PHONE2.matcher(cleanNumber);
        } else {
            matcher = PATTERN_PHONE3.matcher(cleanNumber);
        }
        if (!matcher.find() || matcher.groupCount() != 3) {
            return new String[0];
        }
        return new String[]{matcher.group(1), matcher.group(2), matcher.group(3)};
    }
}
