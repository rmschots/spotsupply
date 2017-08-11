package be.spotsupply.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "Verification expired")  // 418
public class VerificationCodeExpiredException extends RuntimeException {

    public VerificationCodeExpiredException() {
        super();
    }
}
