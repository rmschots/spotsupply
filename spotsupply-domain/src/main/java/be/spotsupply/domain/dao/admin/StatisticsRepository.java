package be.spotsupply.domain.dao.admin;

import be.spotsupply.domain.model.admin.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Statistics findByDateIsBetween(LocalDateTime date, LocalDateTime endDate);
}
