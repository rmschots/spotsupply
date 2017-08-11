package be.spotsupply.rest.dto.product;

import be.spotsupply.rest.dto.product.ProductTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductTO extends ProductTO {
    private List<Long> productTypes;
}
