package be.spotsupply.domain.dao.order;

import be.spotsupply.domain.model.order.CartStatus;
import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.domain.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    long countByStatusIn(List<CartStatus> cartStatus);

    List<ShoppingCart> findAllByStatusIn(List<CartStatus> cartStatus);

    long countByStatusIs(CartStatus cartStatus);

    @Transactional(readOnly = true)
    ShoppingCart findBySessionId(String sessionId);

    @Transactional(readOnly = true)
    ShoppingCart findByUserAndStatusIn(User user, List<CartStatus> cartStatus);

    List<ShoppingCart> findAllByUserAndStatusIsIn(User user, List<CartStatus> cartStatuses);

    @Query(value = "select sc from ShoppingCart sc" +
        " inner join sc.beach b" +
        " where LOWER(b.name) like LOWER(CONCAT('%',:searchTerm, '%'))" +
        "    or LOWER(sc.status) like LOWER(CONCAT('%',:searchTerm, '%'))" +
        "    or LOWER(sc.user.phoneNumber) like LOWER(CONCAT('%',:searchTerm, '%'))" +
        "    or LOWER(sc.id) like LOWER(CONCAT('%',:searchTerm, '%'))"
    )
    Page<ShoppingCart> fullTextSearch(@Param("searchTerm") String searchTerm, Pageable pageable);

}
