package be.spotsupply.rest.dto.product;

import be.spotsupply.rest.dto.product.ProductTypeTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductTypeTO extends ProductTypeTO {
    private Long productCategoryId;
}
