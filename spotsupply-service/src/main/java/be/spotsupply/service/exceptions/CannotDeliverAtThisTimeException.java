package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT)
public class CannotDeliverAtThisTimeException extends RuntimeException {

    public CannotDeliverAtThisTimeException(String maxDeliveryTime) {
        super("We only deliver until " + maxDeliveryTime);
    }
}
