package be.spotsupply.rest.endpoints.common;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CorsEndpoint {
    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public void options() {
        // required for cors
    }
}
