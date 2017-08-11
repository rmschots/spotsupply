package be.spotsupply.domain.commands.user;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateUserCommand {
    private String email;
    private String phoneNumber;
    private String password;
}
