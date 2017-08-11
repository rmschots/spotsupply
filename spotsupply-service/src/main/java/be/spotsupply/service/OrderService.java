package be.spotsupply.service;

import be.spotsupply.domain.dao.order.ShoppingCartRepository;
import be.spotsupply.domain.model.order.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Transactional
    public Page<ShoppingCart> findOrders(int page, int pageSize, String sortBy, Sort.Direction sortingOrder) {
        return shoppingCartRepository.findAll(
                new PageRequest(page, pageSize, sortingOrder, sortBy)
        );
    }

    @Transactional
    public Page<ShoppingCart> findOrders(int page, int pageSize, String searchString, String sortBy, Sort.Direction sortingOrder) {
        if (searchString.isEmpty()) {
            return findOrders(page, pageSize, sortBy, sortingOrder);
        }
        String likeString = "%" + searchString + "%";
        return shoppingCartRepository.fullTextSearch(
                likeString,
                new PageRequest(page, pageSize, sortingOrder, sortBy)
        );
    }
}
