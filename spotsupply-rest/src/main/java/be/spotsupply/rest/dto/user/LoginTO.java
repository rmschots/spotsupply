package be.spotsupply.rest.dto.user;

import be.spotsupply.rest.AbstractTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginTO implements AbstractTO {
    private String phoneOrEmail;
    private String password;
}
