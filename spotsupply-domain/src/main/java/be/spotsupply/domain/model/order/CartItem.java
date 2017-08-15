package be.spotsupply.domain.model.order;

import be.spotsupply.domain.model.common.VersionedEntity;
import be.spotsupply.domain.model.product.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Entity
@Table(name = "cart_item")
@Getter
@Builder
public class CartItem extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ShoppingCart cart;

    @Enumerated(EnumType.STRING)
    private CartItemStatus status;

    @OneToOne
    private Product product;

    @Tolerate
    public CartItem() {
        // required by hibernate
    }
}
