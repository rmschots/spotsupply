package be.spotsupply.rest.endpoints.admin;

import be.spotsupply.rest.dto.admin.StatisticsTO;
import be.spotsupply.rest.mapper.impl.StatisticsMapper;
import be.spotsupply.service.StatisticsService;
import be.spotsupply.service.async.CalculateStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static be.spotsupply.domain.model.user.Role.Constants.ROLE_ADMIN;

@RestController
@RequestMapping("statistics")
public class StatisticsEndpoint {

    @Autowired
    private StatisticsService statisticsService;

    @Autowired
    private CalculateStatisticsService calculateStatisticsService;

    @Autowired
    private StatisticsMapper statisticsMapper;

    @GetMapping
    @RolesAllowed(ROLE_ADMIN)
    public List<StatisticsTO> getStatistics() {
        return statisticsMapper.mapToTOs(statisticsService.getStatistics());
    }

    @GetMapping("refresh")
    @RolesAllowed(ROLE_ADMIN)
    public List<StatisticsTO> refreshStatistics() {
        calculateStatisticsService.calculateStatistics();
        return statisticsMapper.mapToTOs(statisticsService.getStatistics());
    }
}
