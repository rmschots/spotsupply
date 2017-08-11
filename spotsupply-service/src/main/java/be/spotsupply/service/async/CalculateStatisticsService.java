package be.spotsupply.service.async;

import be.spotsupply.domain.dao.product.ProductRepository;
import be.spotsupply.domain.dao.order.ShoppingCartRepository;
import be.spotsupply.domain.dao.admin.StatisticsRepository;
import be.spotsupply.domain.dao.user.UserRepository;
import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.domain.model.admin.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

import static be.spotsupply.domain.model.order.CartStatus.ARCHIVED;
import static be.spotsupply.domain.model.order.CartStatus.ORDERED;

@Service
public class CalculateStatisticsService {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Scheduled(cron = "0 59 23 * * *")
    @Transactional
    public void calculateStatistics() {
        LocalDateTime now = LocalDateTime.now();

        long users = userRepository.count();
        long allCarts = shoppingCartRepository.countByStatusIn(Arrays.asList(ARCHIVED, ORDERED));
        long orderedCarts = shoppingCartRepository.countByStatusIs(ORDERED);
        long products = productRepository.count();
        Statistics statistics = Statistics.builder()
                .amountOfOrders(allCarts)
                .amountOfOrderedOrders(orderedCarts)
                .amountOfProducts(products)
                .amountOfUsers(users)
                .averageCartPrice(calculateAverageCartPrice())
                .averageProductsPerCart(calculateAverageProductPerCart())
                .date(now)
                .build();
        Statistics existingStatistics = statisticsRepository.findByDateIsBetween(now.truncatedTo(ChronoUnit.DAYS), now.truncatedTo(ChronoUnit.DAYS).plusDays(1));
        if (existingStatistics != null) {
            statistics = existingStatistics.updateWith(statistics);
        }
        statisticsRepository.save(statistics);
    }

    private double calculateAverageCartPrice() {
        List<ShoppingCart> carts = shoppingCartRepository.findAllByStatusIn(Arrays.asList(ARCHIVED, ORDERED));
        return carts.isEmpty() ? 0 : carts.stream()
                .map(ShoppingCart::getPrice)
                .reduce(0.0, (aDouble, aDouble2) -> aDouble + aDouble2)
                / carts.size();
    }

    private double calculateAverageProductPerCart() {
        List<ShoppingCart> carts = shoppingCartRepository.findAllByStatusIn(Arrays.asList(ARCHIVED, ORDERED));
        return carts.isEmpty() ? 0 : carts.stream()
                .map(ShoppingCart::getItems)
                .map(List::size)
                .reduce(0, (aDouble, aDouble2) -> aDouble + aDouble2)
                / carts.size();
    }
}
