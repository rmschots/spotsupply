package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PRECONDITION_FAILED, reason = "Cart cannot be changed")  // 412
public class CartCannotBeChangedException extends RuntimeException {

    public CartCannotBeChangedException() {
        super();
    }
}
