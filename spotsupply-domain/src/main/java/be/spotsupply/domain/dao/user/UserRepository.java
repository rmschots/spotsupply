package be.spotsupply.domain.dao.user;

import be.spotsupply.domain.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);

    User findByEmailAndVerifiedTrue(String email);

    User findByPhoneNumber(String phoneNumber);

    List<User> deleteAllByEmailEqualsAndVerifiedFalse(String email);

    Page<User> findByEmailIsLikeOrPhoneNumberIsLike(String email, String phoneNumber, Pageable pageable);
}
