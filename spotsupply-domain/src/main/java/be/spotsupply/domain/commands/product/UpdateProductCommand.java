package be.spotsupply.domain.commands.product;

import be.spotsupply.domain.model.product.ProductType;
import be.spotsupply.domain.model.common.Translation;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class UpdateProductCommand {
    private long id;
    private Translation name;
    private Translation extraInfo;
    private Double price;
    private boolean active;
    private List<ProductType> productTypes;
}
