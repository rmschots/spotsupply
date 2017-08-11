package be.spotsupply.rest.dto.order;

import lombok.Getter;

@Getter
public class OrderInfoTO extends ShoppingCartTO {
    private String phoneNumber;

    public OrderInfoTO(ShoppingCartTO shoppingCartTO, String phoneNumber) {
        super(shoppingCartTO.getId(), shoppingCartTO.getBeachId(), shoppingCartTO.getItems(), shoppingCartTO.getStatus(),
                shoppingCartTO.getPrice(), shoppingCartTO.getOrderDateTime(), shoppingCartTO.getRequestedTime(),
                shoppingCartTO.getDeliveredDateTime());
        this.phoneNumber = phoneNumber;
    }
}
