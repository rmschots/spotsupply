package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PRECONDITION_FAILED, reason = "You already have an open order")  // 412
public class AlreadyOrderedException extends RuntimeException {

    public AlreadyOrderedException() {
        super("You already have an open order");
    }
}
