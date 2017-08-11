package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.admin.Statistics;
import be.spotsupply.rest.dto.admin.StatisticsTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import org.springframework.stereotype.Component;

@Component
public class StatisticsMapper implements DomainToTOMapper<Statistics, StatisticsTO> {
    @Override
    public StatisticsTO mapToTO(Statistics statistics) {
        return StatisticsTO.builder()
                .averageProductsPerCart(statistics.getAverageProductsPerCart())
                .amountOfOrderedOrders(statistics.getAmountOfOrderedOrders())
                .amountOfUsers(statistics.getAmountOfUsers())
                .amountOfProducts(statistics.getAmountOfProducts())
                .amountOfOrders(statistics.getAmountOfOrders())
                .averageCartPrice(statistics.getAverageCartPrice())
                .build();
    }
}
