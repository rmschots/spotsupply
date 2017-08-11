package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "Verification code does not exist")  // 418
public class VerificationCodeDoesNotExistException extends RuntimeException {

    public VerificationCodeDoesNotExistException() {
        super();
    }
}
