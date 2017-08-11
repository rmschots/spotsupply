package be.spotsupply.rest.dto.order;

import be.spotsupply.rest.AbstractTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartItemTO implements AbstractTO {
    private long id;
    private String statusCode;
    private long productId;
}
