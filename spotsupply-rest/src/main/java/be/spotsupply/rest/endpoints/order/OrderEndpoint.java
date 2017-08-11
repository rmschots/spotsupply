package be.spotsupply.rest.endpoints.order;

import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.rest.dto.order.OrdersSearchResultTO;
import be.spotsupply.rest.mapper.impl.OrderInfoMapper;
import be.spotsupply.rest.mapper.impl.OrderSearchSortByMapper;
import be.spotsupply.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.Objects;

import static be.spotsupply.domain.model.user.Role.Constants.ROLE_ADMIN;

@RestController
@RequestMapping("order")
public class OrderEndpoint {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderInfoMapper orderInfoMapper;

    @Autowired
    private OrderSearchSortByMapper orderSearchSortByMapper;

    @GetMapping("searchOrders")
    @RolesAllowed(ROLE_ADMIN)
    public OrdersSearchResultTO searchUsers(@RequestParam int page,
                                            @RequestParam int pageSize,
                                            @RequestParam(required = false) String searchParam,
                                            @RequestParam(required = false, defaultValue = "id") String sortBy,
                                            @RequestParam(required = false, defaultValue = "asc") String sortOrder) {

        String sortByField = orderSearchSortByMapper.mapToDomain(sortBy);
        Page<ShoppingCart> ordersPage;
        if (Objects.isNull(searchParam) || searchParam.isEmpty()) {
            ordersPage = orderService.findOrders(page, pageSize, sortByField, Sort.Direction.fromString(sortOrder));
        } else {
            ordersPage = orderService.findOrders(page, pageSize, searchParam, sortByField, Sort.Direction.fromString(sortOrder));
        }
        return OrdersSearchResultTO.builderImpl()
                .page(ordersPage.getNumber())
                .pages(ordersPage.getTotalPages())
                .orders(orderInfoMapper.mapToTOs(ordersPage.getContent()))
                .filter(searchParam)
                .totalResults(ordersPage.getTotalElements())
                .pageSize(pageSize)
                .build();
    }
}
