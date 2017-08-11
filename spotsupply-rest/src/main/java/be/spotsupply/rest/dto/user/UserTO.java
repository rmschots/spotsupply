package be.spotsupply.rest.dto.user;

import be.spotsupply.rest.AbstractTO;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UserTO implements AbstractTO {
    private Long id;
    private String email;
    private String phoneNumber;
    private List<String> roles;
}
