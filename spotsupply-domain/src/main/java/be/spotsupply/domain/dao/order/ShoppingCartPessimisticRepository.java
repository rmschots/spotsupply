package be.spotsupply.domain.dao.order;

import be.spotsupply.domain.model.order.CartStatus;
import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.domain.model.user.User;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.List;

public interface ShoppingCartPessimisticRepository extends ShoppingCartRepository {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Transactional
    ShoppingCart findBySessionId(String sessionId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Transactional
    ShoppingCart findByUserAndStatusIn(User user, List<CartStatus> cartStatus);

}
