package be.spotsupply.service.security;

import be.spotsupply.domain.dao.user.UserRepository;
import be.spotsupply.domain.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(final String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmailAndVerifiedTrue(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return user;
    }

}