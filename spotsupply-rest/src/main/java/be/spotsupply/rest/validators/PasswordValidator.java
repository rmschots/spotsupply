package be.spotsupply.rest.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<Password, String> {

    @Override
    public void initialize(Password email) {
        // no initialization necessary
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        return password != null
                && !password.equals(password.toLowerCase())
                && !password.equals(password.toUpperCase())
                && password.matches(".*\\d.*");
    }
}
