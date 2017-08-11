package be.spotsupply.domain.dao.order;

import be.spotsupply.domain.model.order.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
