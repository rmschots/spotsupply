package be.spotsupply.domain.commands.product;

import be.spotsupply.domain.model.common.Translation;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UpdateProductCategoryCommand {
    private long productCategoryId;
    private Translation name;
    private int sortingOrder;
}
