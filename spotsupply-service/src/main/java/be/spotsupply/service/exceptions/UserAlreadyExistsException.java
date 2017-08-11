package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.I_AM_A_TEAPOT, reason="User already exists")  // 418
public class UserAlreadyExistsException extends RuntimeException {

    private UserAlreadyExistsException(String message) {
        super(message);
    }

    public static UserAlreadyExistsException forMail(String mail) {
        return new UserAlreadyExistsException("User with email '" + mail + "' already exists");
    }

    public static UserAlreadyExistsException forPhone(String phoneNumber) {
        return new UserAlreadyExistsException("User with phone number '" + phoneNumber + "' already exists");
    }
}
