package be.spotsupply.rest.dto.user;

import be.spotsupply.rest.dto.order.ShoppingCartTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserCartTO {

    private UserTO user;
    private ShoppingCartTO cart;
}
