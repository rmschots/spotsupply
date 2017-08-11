package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "Cart does not exist")  // 412
public class CartDoesNotExistException extends RuntimeException {

    public CartDoesNotExistException() {
        super();
    }
}
