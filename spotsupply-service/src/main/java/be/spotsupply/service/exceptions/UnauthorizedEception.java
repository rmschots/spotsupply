package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.UNAUTHORIZED, reason="Unauthorized to access this resource")  // 401
public class UnauthorizedEception extends RuntimeException {

    public UnauthorizedEception() {
        super("Unauthorized to access this resource");
    }
}
