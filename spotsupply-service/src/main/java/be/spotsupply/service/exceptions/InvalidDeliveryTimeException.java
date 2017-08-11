package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PRECONDITION_FAILED, reason = "Invalid delivery time")  // 412
public class InvalidDeliveryTimeException extends RuntimeException {

    public InvalidDeliveryTimeException() {
        super();
    }
}
