package be.spotsupply.rest.endpoints.beach;

import be.spotsupply.rest.dto.beach.BeachTO;
import be.spotsupply.rest.mapper.impl.BeachMapper;
import be.spotsupply.service.BeachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("beach")
public class BeachEndpoint {

    @Autowired
    private BeachService beachService;
    @Autowired
    private BeachMapper beachMapper;

    @GetMapping
    public List<BeachTO> getBeaches() {
        return beachMapper.mapToTOs(beachService.getAllBeaches());
    }
}
