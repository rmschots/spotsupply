package be.spotsupply.domain.model.admin;

import be.spotsupply.domain.model.common.VersionedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "statistics")
@Getter
@Builder
public class Statistics extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private LocalDateTime date;

    @Column(name = "amount_of_orders")
    private Long amountOfOrders;

    @Column(name = "amount_of_users")
    private Long amountOfUsers;

    @Column(name = "amount_of_products")
    private Long amountOfProducts;

    @Column(name = "amount_of_ordered_orders")
    private Long amountOfOrderedOrders;

    @Column(name = "average_cart_price")
    private Double averageCartPrice;

    @Column(name = "average_products_per_cart")
    private Double averageProductsPerCart;

    @Tolerate
    public Statistics() {
        // required by hibernate
    }

    public Statistics updateWith(Statistics statistics) {
        this.amountOfOrderedOrders = statistics.getAmountOfOrderedOrders();
        this.amountOfOrders = statistics.getAmountOfOrders();
        this.amountOfProducts = statistics.getAmountOfProducts();
        this.amountOfUsers = statistics.getAmountOfUsers();
        this.averageCartPrice = statistics.getAverageCartPrice();
        this.averageProductsPerCart = statistics.getAverageProductsPerCart();
        return this;
    }
}
