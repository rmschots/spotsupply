package be.spotsupply.domain.dao.product;

import be.spotsupply.domain.model.product.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
}
