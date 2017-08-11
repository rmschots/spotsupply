package be.spotsupply.rest.dto.admin;

import be.spotsupply.rest.AbstractTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StatisticsTO implements AbstractTO {
    private long amountOfOrders;
    private long amountOfUsers;
    private long amountOfProducts;
    private long amountOfOrderedOrders;
    private double averageCartPrice;
    private double averageProductsPerCart;
}
