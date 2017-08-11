package be.spotsupply.rest.endpoints.admin;

import be.spotsupply.service.TestDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

import static be.spotsupply.domain.model.user.Role.Constants.ROLE_ADMIN;

@RestController
@RequestMapping("testData")
public class TestDataEndpoint {

    @Autowired
    private TestDataService testDataService;

    @GetMapping("addDummyUsers")
    @RolesAllowed(ROLE_ADMIN)
    public void addDummyUsers(@RequestParam int amount) {
        testDataService.addDummyUsers(amount);
    }

    @GetMapping("addDummyOrders")
    @RolesAllowed(ROLE_ADMIN)
    public void addDummyOrders(@RequestParam int amount) {
        testDataService.addDummyOrders(amount);
    }
}
