package be.spotsupply.domain.model.order;

import be.spotsupply.domain.model.common.VersionedEntity;
import be.spotsupply.domain.model.beach.Beach;
import be.spotsupply.domain.model.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;
import org.hibernate.annotations.OptimisticLocking;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@OptimisticLocking
@Table(name = "shopping_cart", indexes = {
        @Index(columnList = "status"),
        @Index(columnList = "session_id"),
        @Index(columnList = "user_id")
})
@Getter
@Setter
@Builder
public class ShoppingCart extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @Column(name = "session_id")
    private String sessionId;

    @ManyToOne(optional = false)
    private Beach beach;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items;

    @Enumerated(EnumType.STRING)
    private CartStatus status;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "order_datetime")
    private LocalDateTime orderDateTime = null;

    @Column(name = "requested_time")
    private String requestedTime = null;

    @Column(name = "delivered_datetime")
    private LocalDateTime deliveredDateTime = null;

    @Tolerate
    public ShoppingCart() {
        // required by hibernate
    }

    public boolean isInProgress() {
        return status.equals(CartStatus.IN_PROGRESS);
    }

    public boolean isOrdered() {
        return status.equals(CartStatus.ORDERED);
    }

    public boolean isArchived() {
        return status.equals(CartStatus.ARCHIVED);
    }

    public boolean isCancelled() {
        return status.equals(CartStatus.CANCELLED);
    }
}
