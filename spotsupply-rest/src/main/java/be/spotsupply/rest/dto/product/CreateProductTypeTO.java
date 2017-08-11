package be.spotsupply.rest.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductTypeTO extends ProductTypeTO {
    private Long productCategoryId;
}
