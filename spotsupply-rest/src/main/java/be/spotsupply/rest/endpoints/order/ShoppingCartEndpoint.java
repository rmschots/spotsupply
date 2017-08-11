package be.spotsupply.rest.endpoints.order;

import be.spotsupply.domain.commands.order.CreateShoppingCartCommand;
import be.spotsupply.domain.commands.order.PlaceOrderCommand;
import be.spotsupply.domain.model.beach.Beach;
import be.spotsupply.domain.model.order.CartStatus;
import be.spotsupply.rest.dto.order.CreateCartTO;
import be.spotsupply.rest.dto.order.ShoppingCartTO;
import be.spotsupply.rest.interceptors.HasCart;
import be.spotsupply.rest.mapper.impl.ShoppingCartMapper;
import be.spotsupply.service.BeachService;
import be.spotsupply.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static be.spotsupply.domain.model.order.CartStatus.IN_PROGRESS;
import static be.spotsupply.domain.model.order.CartStatus.ORDERED;

@RestController
@RequestMapping("shoppingCart")
public class ShoppingCartEndpoint {

    @Autowired
    private ShoppingCartService shoppingCartService;
    @Autowired
    private ShoppingCartMapper shoppingCartMapper;
    @Autowired
    private BeachService beachService;

    @GetMapping("")
    @HasCart
    public ShoppingCartTO getCart() {
        return shoppingCartMapper.mapToTO(shoppingCartService.getShoppingCart());
    }

    @GetMapping("history")
    public List<ShoppingCartTO> getCartHistory() {
        return shoppingCartMapper.mapToTOs(shoppingCartService.getShoppingCartHistory());
    }

    @PostMapping()
    public ShoppingCartTO createCart(@RequestBody CreateCartTO createCartTO) {
        Beach beach = beachService.findBeach(createCartTO.getBeachId());
        CreateShoppingCartCommand command = CreateShoppingCartCommand.builder().beach(beach).build();
        return shoppingCartMapper.mapToTO(shoppingCartService.createShoppingCart(command));
    }

    @PostMapping("addProduct")
    @HasCart(status = CartStatus.IN_PROGRESS)
    public ShoppingCartTO addProduct(@RequestParam Long productId) {
        return shoppingCartMapper.mapToTO(shoppingCartService.addProduct(productId));
    }

    @PostMapping("removeProduct")
    @HasCart(status = IN_PROGRESS)
    public ShoppingCartTO removeProduct(@RequestParam Long productId) {
        return shoppingCartMapper.mapToTO(shoppingCartService.removeProduct(productId));
    }

    @PostMapping("removeAllProducts")
    @HasCart(status = IN_PROGRESS)
    public ShoppingCartTO removeAllProducts() {
        return shoppingCartMapper.mapToTO(shoppingCartService.removeAllProducts());
    }

    @PostMapping("placeOrder")
    @HasCart(status = IN_PROGRESS)
    public ShoppingCartTO placeOrder(@RequestBody ShoppingCartTO shoppingCartTO) {
        PlaceOrderCommand command = PlaceOrderCommand.builder()
                .requestedTime(shoppingCartTO.getRequestedTime())
                .build();
        return shoppingCartMapper.mapToTO(shoppingCartService.placeOrder(command, null));
    }

    @PostMapping("completeOrder")
    @HasCart(status = ORDERED)
    public void completeOrder() {
        shoppingCartService.completeOrder();
    }
}
