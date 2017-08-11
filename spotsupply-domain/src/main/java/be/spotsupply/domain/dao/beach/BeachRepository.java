package be.spotsupply.domain.dao.beach;

import be.spotsupply.domain.model.beach.Beach;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeachRepository extends JpaRepository<Beach, Long> {
}
