package be.spotsupply.service;

import be.spotsupply.domain.commands.order.CreateShoppingCartCommand;
import be.spotsupply.domain.commands.order.PlaceOrderCommand;
import be.spotsupply.domain.dao.order.ShoppingCartPessimisticRepository;
import be.spotsupply.domain.dao.order.ShoppingCartRepository;
import be.spotsupply.domain.dao.product.ProductRepository;
import be.spotsupply.domain.model.order.CartItem;
import be.spotsupply.domain.model.order.CartItemStatus;
import be.spotsupply.domain.model.order.CartStatus;
import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.domain.model.product.Product;
import be.spotsupply.domain.model.user.User;
import be.spotsupply.service.exceptions.NotLoggedInException;
import be.spotsupply.service.util.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

import static be.spotsupply.domain.model.order.CartStatus.IN_PROGRESS;
import static java.util.Collections.singletonList;

@Service
@Transactional
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;
    @Autowired
    private ShoppingCartPessimisticRepository shoppingCartPessimisticRepository;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DeliveryService deliveryService;

    public ShoppingCart getShoppingCart() {
        return fetchCart();
    }

    public ShoppingCart createShoppingCart(CreateShoppingCartCommand command) {
        ShoppingCart shoppingCart = fetchCart();
        if (shoppingCart != null) {
            // session already has cart
            return shoppingCart;
        }
        shoppingCart = ShoppingCart.builder()
            .beach(command.getBeach())
            .sessionId(authenticationService.isAnonymous() ? authenticationService.getSessionId() : null)
            .items(new HashSet<>())
            .user(authenticationService.getUser())
            .status(IN_PROGRESS)
            .price(0.0)
            .build();
        shoppingCart = shoppingCartRepository.saveAndFlush(shoppingCart);
        return shoppingCart;
    }

    public ShoppingCart addProduct(Long productId) {
        ShoppingCart cart = fetchCartWithLock();
        Product product = productRepository.findProductByIdAndActive(productId, true);
        CartItem cartItem = CartItem.builder()
            .cart(cart)
            .product(product)
            .status(CartItemStatus.IN_CART)
            .build();
        cart.addCartItem(cartItem);
        recalculateCartPrice(cart);
        return cart;
    }

    public ShoppingCart removeProduct(Long productId) {
        ShoppingCart cart = fetchCartWithLock();
        Optional<CartItem> itemOpt = cart.getItems().stream()
            .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
            .findAny();
        if (!itemOpt.isPresent()) {
            return null;
        }
        cart.removeCartItem(itemOpt.get());
        recalculateCartPrice(cart);
        cart = shoppingCartRepository.save(cart);
        return cart;
    }

    public ShoppingCart removeAllProducts() {
        ShoppingCart cart = fetchCartWithLock();
        cart.clearCart();
        recalculateCartPrice(cart);
        cart = shoppingCartRepository.save(cart);
        return cart;
    }

    public ShoppingCart placeOrder(PlaceOrderCommand command, LocalDateTime version) {
        deliveryService.validateDeliveryTime(command.getRequestedTime());
        ShoppingCart cart = fetchCartWithLock(version);
        ShoppingCart cartTO = cart;
        // TODO: compare versions (Optimistic locking)
//        if (!cartsEqual(cartTO, command)) {
//            return cartTO;
//        }
        cart.setStatus(CartStatus.ORDERED);
        cart.setOrderDateTime(LocalDateTime.now());
        cart.setRequestedTime(command.getRequestedTime());
        cart = shoppingCartRepository.saveAndFlush(cart);
        return cart;
    }

    public void completeOrder() {
        ShoppingCart cart = fetchCartWithLock();
        cart.setStatus(CartStatus.ARCHIVED);
        cart.setDeliveredDateTime(LocalDateTime.now());
        shoppingCartRepository.saveAndFlush(cart);
    }

    public ShoppingCart migrateShoppingCartOfSessionToUser(String sessionId, User user) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionId(sessionId);
        ShoppingCart existing = shoppingCartRepository.findByUserAndStatusIn(user, Arrays.asList(CartStatus.IN_PROGRESS, CartStatus.ORDERED));
        ShoppingCart cartToKeep;
        if (shoppingCart == null || shoppingCart.getItems().isEmpty()) {
            if (shoppingCart != null) {
                shoppingCartRepository.delete(shoppingCart);
                shoppingCartRepository.flush();
            }
            cartToKeep = existing;
        } else {
            if (existing != null) {
                if (existing.isInProgress()) {
                    shoppingCartRepository.delete(existing);
                    shoppingCartRepository.flush();
                    cartToKeep = shoppingCart;
                } else {
                    shoppingCartRepository.delete(shoppingCart);
                    shoppingCartRepository.flush();
                    cartToKeep = existing;
                }
            } else {
                cartToKeep = shoppingCart;
            }
        }
        if (cartToKeep != null) {
            cartToKeep.setUser(user);
            cartToKeep.setSessionId(null);
            cartToKeep = shoppingCartRepository.saveAndFlush(cartToKeep);
        }
        return cartToKeep;
    }

    public List<ShoppingCart> getShoppingCartHistory() {
        if (authenticationService.isAnonymous()) {
            throw new NotLoggedInException();
        }
        User user = authenticationService.getUser();
        return shoppingCartRepository.findAllByUserAndStatusIsIn(user, singletonList(CartStatus.ARCHIVED));
    }

    public ShoppingCart fetchCartWithLock() {
        return fetchCartWithLock(null);
    }

    public ShoppingCart fetchCartWithLock(LocalDateTime version) {
        ShoppingCart cart = getCartFromRepo(shoppingCartPessimisticRepository);
        if (version != null && !version.equals(cart.getUpdated())) {
            throw new IllegalArgumentException("Cart is outdated");
        }
        return cart;
    }

    public ShoppingCart fetchCart() {
        return getCartFromRepo(shoppingCartRepository);
    }

    public ShoppingCart getCartFromRepo(ShoppingCartRepository shoppingCartRepository) {
        ShoppingCart cart;
        if (authenticationService.isAnonymous()) {
            String sessionId = authenticationService.getSessionId();
            cart = shoppingCartRepository.findBySessionId(sessionId);
        } else {
            User user = authenticationService.getUser();
            cart = shoppingCartRepository.findByUserAndStatusIn(user, Arrays.asList(CartStatus.IN_PROGRESS, CartStatus.ORDERED));
        }
        return cart;
    }

    public void recalculateCartPrice(ShoppingCart cart) {
        cart.setPrice(
            cart.getItems().stream()
                .map(cartItem -> cartItem.getProduct().getPrice())
                .reduce(0.0, Double::sum)
        );
    }

    private boolean cartsEqual(ShoppingCart cart1, ShoppingCart cart2) {
        return Objects.equals(cart1.getPrice(), cart2.getPrice())
            && cart1.getId().equals(cart2.getId())
            && cart1.getItems().stream()
            .map(item1 -> cart2.getItems().stream()
                .filter(item2 ->
                    Objects.equals(item1.getId(), item2.getId())
                        && Objects.equals(item1.getProduct().getId(), item2.getProduct().getId())
                        && Objects.equals(item1.getStatus(), item2.getStatus())
                ).count() == 1

            )
            .reduce((aBoolean, aBoolean2) -> aBoolean && aBoolean2)
            .orElse(false);
    }
}
