package be.spotsupply.domain.commands.product;

import be.spotsupply.domain.model.product.ProductCategory;
import be.spotsupply.domain.model.common.Translation;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateProductTypeCommand {
    private Translation name;
    private boolean hasTitle;
    private int sortingOrder;
    private ProductCategory productCategory;
}
