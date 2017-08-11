package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.rest.dto.order.ShoppingCartTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ShoppingCartMapper implements DomainToTOMapper<ShoppingCart, ShoppingCartTO> {

    @Autowired
    private CartItemMapper cartItemMapper;

    @Override
    public ShoppingCartTO mapToTO(ShoppingCart shoppingCart) {
        if (shoppingCart == null) {
            return null;
        }
        return ShoppingCartTO.builder()
                .id(shoppingCart.getId())
                .items(cartItemMapper.mapToTOs(shoppingCart.getItems()))
                .beachId(shoppingCart.getBeach().getId())
                .status(shoppingCart.getStatus().name())
                .price(shoppingCart.getPrice())
                .orderDateTime(shoppingCart.getOrderDateTime())
                .requestedTime(shoppingCart.getRequestedTime())
                .deliveredDateTime(shoppingCart.getDeliveredDateTime())
                .build();
    }
}
