package be.spotsupply.rest.dto.user;

import be.spotsupply.rest.AbstractTO;
import be.spotsupply.rest.validators.Email;
import be.spotsupply.rest.validators.Password;
import be.spotsupply.rest.validators.PhoneNumber;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateUserTO implements AbstractTO {
    @Email
    private String email;
    @PhoneNumber
    private String phoneNumber;
    @Password
    private String password;
}
