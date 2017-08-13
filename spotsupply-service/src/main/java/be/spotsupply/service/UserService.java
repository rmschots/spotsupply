package be.spotsupply.service;

import be.spotsupply.domain.commands.user.CreateUserCommand;
import be.spotsupply.domain.dao.user.UserRepository;
import be.spotsupply.domain.dao.user.VerificationRepository;
import be.spotsupply.domain.model.user.User;
import be.spotsupply.domain.model.user.Verification;
import be.spotsupply.domain.model.user.VerificationType;
import be.spotsupply.service.async.MailService;
import be.spotsupply.service.exceptions.BadPasswordException;
import be.spotsupply.service.exceptions.VerificationCodeDoesNotExistException;
import be.spotsupply.service.exceptions.VerificationCodeExpiredException;
import be.spotsupply.service.util.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static be.spotsupply.domain.model.user.VerificationType.RESET_PASSWORD;
import static be.spotsupply.domain.model.user.VerificationType.VERIFY_EMAIL;
import static be.spotsupply.service.exceptions.UserAlreadyExistsException.forMail;

@Service
public class UserService {

    @Value("${envTarget:dev}")
    private String environment;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailService mailService;

    @Transactional
    public void create(CreateUserCommand command) {
        User existingUser = userRepository.findByEmailAndVerifiedTrue(command.getEmail());
        if (existingUser != null) {
            throw forMail(command.getEmail());
        }
        User user = User.builder()
                .email(command.getEmail())
                .phoneNumber(command.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(command.getPassword()))
                .verified(false)
                .build();
        user = userRepository.saveAndFlush(user);

        if ("prod".matches(environment)) {
            Verification verification = Verification.builder()
                    .verificationCode(UUID.randomUUID().toString())
                    .type(VERIFY_EMAIL)
                    .user(user)
                    .build();
            verification = verificationRepository.saveAndFlush(verification);
            mailService.sendVerificationMail(command.getEmail(), verification.getVerificationCode(), "Spotsupply verification code", "verify-email/");
        }else {
            user.setVerified(true);
            userRepository.saveAndFlush(user);
        }
    }

    public User getUser() {
        return authenticationService.isAnonymous()
                ? null
                : authenticationService.getUser();
    }

    public User updateEmail(String email, String currentPassword) {
        User user = authenticationService.getUser();
        validatePassword(user, currentPassword);
        user.setEmail(email);
        userRepository.save(user);
        return user;
    }

    public User updatePhoneNumber(String phoneNumber, String currentPassword) {
        User user = authenticationService.getUser();
        validatePassword(user, currentPassword);
        user.setPhoneNumber(phoneNumber);
        userRepository.save(user);
        return user;
    }

    public User updatePassword(String newPassword, String currentPassword) {
        User user = authenticationService.getUser();
        validatePassword(user, currentPassword);
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return user;
    }

    @Transactional(noRollbackFor = VerificationCodeExpiredException.class)
    public void verifyEmail(String verificationCode) {
        Verification verification = verificationRepository.findFirstByVerificationCodeAndType(verificationCode, VERIFY_EMAIL);
        if (verification == null) {
            throw new VerificationCodeDoesNotExistException();
        }
        if (verification.isExpired()) {
            userRepository.delete(verification.getUser());
            throw new VerificationCodeExpiredException();
        }
        User user = verification.getUser();
        user.setVerified(true);
        userRepository.saveAndFlush(user);
        verificationRepository.delete(verification);

        userRepository.deleteAllByEmailEqualsAndVerifiedFalse(user.getEmail());
    }

    @Transactional
    public void forgotPassword(String email) {
        User user = userRepository.findByEmailAndVerifiedTrue(email);
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }
        Verification verification = verificationRepository.findFirstByTypeAndUser(VerificationType.RESET_PASSWORD, user);
        if (verification == null) {
            verification = Verification.builder()
                    .verificationCode(UUID.randomUUID().toString())
                    .user(user)
                    .type(RESET_PASSWORD)
                    .build();
        }
        verificationRepository.save(verification);
        if ("prod".matches(environment)) {
            mailService.sendVerificationMail(email, verification.getVerificationCode(), "SpotSupply reset Password", "reset-password/");
        }
        verification.setMailSentDateTime(LocalDateTime.now());
        verificationRepository.save(verification);
    }

    @Transactional(noRollbackFor = VerificationCodeExpiredException.class)
    public void resetPassword(String verificationCode, String newPassword) {
        Verification verification = verificationRepository.findFirstByVerificationCodeAndType(verificationCode, VerificationType.RESET_PASSWORD);
        if (verification == null) {
            throw new VerificationCodeDoesNotExistException();
        }
        if (verification.isExpired()) {
            verificationRepository.delete(verification);
            throw new VerificationCodeExpiredException();
        }
        User user = verification.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.saveAndFlush(user);
        verificationRepository.delete(verification);
    }

    @Transactional(noRollbackFor = VerificationCodeExpiredException.class)
    public void validateResetPasswordVerification(String verificationCode) {
        Verification verification = verificationRepository.findFirstByVerificationCodeAndType(verificationCode, VerificationType.RESET_PASSWORD);
        if (verification == null) {
            throw new VerificationCodeDoesNotExistException();
        }
        if (verification.isExpired()) {
            verificationRepository.delete(verification);
            throw new VerificationCodeExpiredException();
        }
        verification.setMailSentDateTime(LocalDateTime.now());
        verificationRepository.save(verification);
    }

    @Transactional
    public Page<User> findUsers(int page, int pageSize, String sortBy, String sortingOrder) {
        if (sortBy.isEmpty()) {
            sortBy = "id";
        }
        return userRepository.findAll(
                new PageRequest(page, pageSize, Sort.Direction.fromString(sortingOrder), sortBy)
        );
    }

    @Transactional
    public Page<User> findUsers(int page, int pageSize, String searchString, String sortBy, String sortingOrder) {
        if (searchString.isEmpty()) {
            return findUsers(page, pageSize, sortBy, sortingOrder);
        }
        if (sortBy.isEmpty()) {
            sortBy = "id";
        }
        String likeString = "%" + searchString + "%";
        return userRepository.findByEmailIsLikeOrPhoneNumberIsLike(
                likeString,
                likeString,
                new PageRequest(page, pageSize, Sort.Direction.fromString(sortingOrder), sortBy)
        );
    }

    private void validatePassword(User user, String password) {
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new BadPasswordException();
        }
    }
}
