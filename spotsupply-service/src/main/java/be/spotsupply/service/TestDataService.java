package be.spotsupply.service;

import be.spotsupply.domain.dao.beach.BeachRepository;
import be.spotsupply.domain.dao.order.CartItemRepository;
import be.spotsupply.domain.dao.order.ShoppingCartRepository;
import be.spotsupply.domain.dao.product.ProductRepository;
import be.spotsupply.domain.dao.user.UserRepository;
import be.spotsupply.domain.model.beach.Beach;
import be.spotsupply.domain.model.order.CartItem;
import be.spotsupply.domain.model.order.CartItemStatus;
import be.spotsupply.domain.model.order.CartStatus;
import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.domain.model.product.Product;
import be.spotsupply.domain.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.IntStream;
import java.util.stream.LongStream;

@Service
public class TestDataService {

    private static final Random random = new Random(System.currentTimeMillis());

    @Autowired
    private BeachRepository beachRepository;
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ShoppingCartService shoppingCartService;


    @Transactional
    public void addDummyUsers(int amount) {
        Random rand = new Random(System.currentTimeMillis());
        LongStream.range(0, amount).forEach(id -> {
            User user = User.builder()
                .email("email." + UUID.randomUUID() + "@gmail.com")
                .passwordHash(UUID.randomUUID().toString())
                .phoneNumber("0496" + (rand.nextInt(900000) + 100000))
                .verified(true)
                .build();
            userRepository.save(user);
        });
    }

    @Transactional
    public void addDummyOrders(int amount) {
        List<User> users = userRepository.findAll();
        List<Beach> beaches = beachRepository.findAll();
        List<Product> products = productRepository.findAll();

        LongStream.range(0, amount).forEach(id -> {
            ShoppingCart shoppingCart = createShoppingCart(users, beaches);
            shoppingCartRepository.saveAndFlush(shoppingCart);
            IntStream.rangeClosed(1, random.nextInt(10) + 1).forEach(am -> {
                CartItem item = CartItem.builder()
                    .cart(shoppingCart)
                    .product(products.get(random.nextInt(products.size())))
                    .status(CartItemStatus.IN_CART)
                    .build();
                cartItemRepository.saveAndFlush(item);
                shoppingCart.addCartItem(item);
            });
            shoppingCartService.recalculateCartPrice(shoppingCart);
            shoppingCartRepository.saveAndFlush(shoppingCart);
        });
    }

    private ShoppingCart createShoppingCart(List<User> users, List<Beach> beaches) {
        return ShoppingCart.builder()
            .user(users.get(random.nextInt(users.size())))
            .beach(beaches.get(random.nextInt(beaches.size())))
            .deliveredDateTime(LocalDateTime.now().minusDays(random.nextInt(5000)))
            .orderDateTime(LocalDateTime.now().minusDays(random.nextInt(5000)))
            .requestedTime(LocalDateTime.now().minusDays(random.nextInt(5000)).toString())
            .price(Math.round(random.nextDouble() * 100) / 10.0)
            .status(CartStatus.ARCHIVED)
            .items(new HashSet<>())
            .build();
    }
}
