package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "You have to be logged in to access this resource")  // 418
public class NotLoggedInException extends RuntimeException {

    public NotLoggedInException() {
        super("You are not logged in");
    }
}
