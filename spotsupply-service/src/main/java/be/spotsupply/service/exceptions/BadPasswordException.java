package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Bad password")  // 401
public class BadPasswordException extends RuntimeException {

    public BadPasswordException() {
        super();
    }
}
