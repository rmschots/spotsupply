package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.user.User;
import be.spotsupply.rest.dto.user.CreateUserTO;
import be.spotsupply.rest.dto.user.UserTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import be.spotsupply.rest.mapper.TOToDomainMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper implements DomainToTOMapper<User, UserTO>, TOToDomainMapper<CreateUserTO, User> {


    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserTO mapToTO(User user) {
        if (user == null) {
            return null;
        }
        return UserTO.builder()
                .id(user.getId())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .roles(user.getUserRoles().stream().map(userRoles -> userRoles.getRole().name()).collect(Collectors.toList()))
                .build();
    }

    public User mapToDomain(CreateUserTO createUserTO) {
        return User.builder()
                .email(createUserTO.getEmail())
                .phoneNumber(createUserTO.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(createUserTO.getPassword()))
                .verified(false)
                .build();
    }
}
