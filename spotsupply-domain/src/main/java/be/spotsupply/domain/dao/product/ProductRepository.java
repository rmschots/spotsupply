package be.spotsupply.domain.dao.product;

import be.spotsupply.domain.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    public Product findProductByIdAndActive(Long id, boolean active);

    public List<Product> findAllByProductTypesIsNull();
}
