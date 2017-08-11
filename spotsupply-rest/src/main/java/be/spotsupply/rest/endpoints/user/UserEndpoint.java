package be.spotsupply.rest.endpoints.user;

import be.spotsupply.domain.commands.user.CreateUserCommand;
import be.spotsupply.domain.model.user.User;
import be.spotsupply.rest.dto.user.CreateUserTO;
import be.spotsupply.rest.dto.user.UserTO;
import be.spotsupply.rest.dto.user.UsersSearchResultTO;
import be.spotsupply.rest.mapper.impl.UserMapper;
import be.spotsupply.rest.validators.Email;
import be.spotsupply.rest.validators.Password;
import be.spotsupply.rest.validators.PhoneNumber;
import be.spotsupply.service.UserService;
import be.spotsupply.service.exceptions.NotLoggedInException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.Objects;

import static be.spotsupply.domain.model.user.Role.Constants.ROLE_ADMIN;
import static be.spotsupply.domain.model.user.Role.Constants.ROLE_USER;

@RestController
@RequestMapping("account")
@Validated
public class UserEndpoint {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("create")
    public void createAccount(@RequestBody @Valid CreateUserTO createUserTO) {
        CreateUserCommand command = CreateUserCommand.builder()
                .email(createUserTO.getEmail())
                .phoneNumber(createUserTO.getPhoneNumber())
                .password(createUserTO.getPassword())
                .build();
        userService.create(command);
    }

    @PostMapping("verify")
    public void verifyAccount(@RequestParam String verificationCode) {
        userService.verifyEmail(verificationCode);
    }

    @GetMapping("")
    public UserTO getAccount() {
        UserTO user = userMapper.mapToTO(userService.getUser());
        if (user == null) {
            throw new NotLoggedInException();
        }
        return user;
    }

    @PostMapping("updateEmail")
    @RolesAllowed(ROLE_USER)
    public UserTO updateEmail(@RequestBody @Valid UpdateEmailTO updateEmailTO) {
        return userMapper.mapToTO(userService.updateEmail(updateEmailTO.email, updateEmailTO.currentPassword));
    }

    @PostMapping("updatePhoneNumber")
    @RolesAllowed(ROLE_USER)
    public UserTO updatePhoneNumber(@RequestBody @Valid UpdatePhoneNumberTO updatePhoneNumberTO) {
        return userMapper.mapToTO(userService.updatePhoneNumber(updatePhoneNumberTO.phoneNumber, updatePhoneNumberTO.currentPassword));
    }

    @PostMapping("updatePassword")
    @RolesAllowed(ROLE_USER)
    public UserTO updatePassword(@RequestBody @Valid UpdatePasswordTO updatePasswordTO) {
        return userMapper.mapToTO(userService.updatePassword(updatePasswordTO.newPassword, updatePasswordTO.currentPassword));
    }

    @PostMapping("forgotPassword")
    public void forgotPassword(@Email @RequestParam String email) {
        userService.forgotPassword(email);
    }

    @PostMapping("resetPassword")
    public void resetPassword(@RequestParam String verificationCode, @Password @RequestParam String newPassword) {
        userService.resetPassword(verificationCode, newPassword);
    }

    @PostMapping("validateResetPasswordVerification")
    public void validateResetPasswordVerification(@RequestParam String verificationCode) {
        userService.validateResetPasswordVerification(verificationCode);
    }

    @GetMapping("searchUsers")
    @RolesAllowed(ROLE_ADMIN)
    public UsersSearchResultTO searchUsers(@RequestParam int page,
                                           @RequestParam int pageSize,
                                           @RequestParam(required = false) String searchParam,
                                           @RequestParam(required = false, defaultValue = "id") String sortBy,
                                           @RequestParam(required = false, defaultValue = "asc") String sortOrder) {
        Page<User> userPage;
        if (Objects.isNull(searchParam) || searchParam.isEmpty()) {
            userPage = userService.findUsers(page, pageSize, sortBy, sortOrder);
        } else {
            userPage = userService.findUsers(page, pageSize, searchParam, sortBy, sortOrder);
        }
        return UsersSearchResultTO.builderImpl()
                .page(userPage.getNumber())
                .pages(userPage.getTotalPages())
                .users(userMapper.mapToTOs(userPage.getContent()))
                .totalResults(userPage.getTotalElements())
                .pageSize(pageSize)
                .filter(searchParam)
                .build();
    }

    @NoArgsConstructor
    @Getter
    static class UpdateEmailTO {
        @Email
        String email;
        String currentPassword;
    }

    @NoArgsConstructor
    @Getter
    static class UpdatePhoneNumberTO {
        @PhoneNumber
        String phoneNumber;
        String currentPassword;
    }

    @NoArgsConstructor
    @Getter
    static class UpdatePasswordTO {
        @Password
        String newPassword;
        String currentPassword;
    }
}
