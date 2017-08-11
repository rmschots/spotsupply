package be.spotsupply.service;

import be.spotsupply.domain.dao.admin.StatisticsRepository;
import be.spotsupply.domain.model.admin.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private StatisticsRepository statisticsRepository;

    public List<Statistics> getStatistics() {
        return statisticsRepository.findAll(new Sort("date"));
    }
}
