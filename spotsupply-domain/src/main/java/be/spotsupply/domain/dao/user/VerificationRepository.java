package be.spotsupply.domain.dao.user;

import be.spotsupply.domain.model.user.User;
import be.spotsupply.domain.model.user.Verification;
import be.spotsupply.domain.model.user.VerificationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationRepository extends JpaRepository<Verification, String> {
    Verification findFirstByVerificationCodeAndType(String verificationCode, VerificationType type);
    Verification findFirstByTypeAndUser(VerificationType type, User user);
}
