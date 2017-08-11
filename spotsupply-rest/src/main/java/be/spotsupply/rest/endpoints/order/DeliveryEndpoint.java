package be.spotsupply.rest.endpoints.order;

import be.spotsupply.domain.model.order.CartStatus;
import be.spotsupply.rest.interceptors.HasCart;
import be.spotsupply.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("delivery")
public class DeliveryEndpoint {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("possibleTimes")
    @HasCart(status = CartStatus.IN_PROGRESS)
    public List<String> getDeliveryTimes() {
        return deliveryService.getDeliveryTimes();
    }
}
