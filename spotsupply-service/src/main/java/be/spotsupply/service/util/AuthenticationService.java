package be.spotsupply.service.util;

import be.spotsupply.domain.model.user.User;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.context.request.RequestContextHolder;

@Service
public class AuthenticationService {

    public String getSessionId() {
        return RequestContextHolder.currentRequestAttributes().getSessionId();
    }

    public boolean isAnonymous() {
        return SecurityContextHolder.getContext().getAuthentication() == null
                || SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken;
    }

    public User getUser() {
        if (isAnonymous()) {
            return null;
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        Assert.notNull(principal, "Authentication principal null");
        Assert.isInstanceOf(User.class, principal, "Principal is instance of User");
        return (User) principal;
    }
}
