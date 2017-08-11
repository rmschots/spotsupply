package be.spotsupply.domain.model.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum Role {
    ROLE_USER(Constants.ROLE_USER),
    ROLE_ADMIN(Constants.ROLE_ADMIN),
    ROLE_ANONYMOUS(Constants.ROLE_ANONYMOUS),
    ACTUATOR(Constants.ACTUATOR);

    private final SimpleGrantedAuthority authority;

    Role(String roleString) {
        authority = new SimpleGrantedAuthority(roleString);
    }

    public GrantedAuthority getGrantedAuthority() {
        return authority;
    }

    public static class Constants {
        public static final String ROLE_USER = "ROLE_USER";
        public static final String ROLE_ADMIN = "ROLE_ADMIN";
        public static final String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";
        public static final String ACTUATOR = "ACTUATOR";
    }
}
