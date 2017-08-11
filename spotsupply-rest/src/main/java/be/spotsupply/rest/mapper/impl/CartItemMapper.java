package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.order.CartItem;
import be.spotsupply.rest.dto.order.CartItemTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper implements DomainToTOMapper<CartItem, CartItemTO> {

    @Override
    public CartItemTO mapToTO(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }
        return CartItemTO.builder()
                .id(cartItem.getId())
                .statusCode(cartItem.getStatus().name())
                .productId(cartItem.getProduct().getId())
                .build();
    }
}
