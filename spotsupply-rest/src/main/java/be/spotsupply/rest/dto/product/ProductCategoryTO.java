package be.spotsupply.rest.dto.product;

import be.spotsupply.rest.AbstractTO;
import be.spotsupply.rest.dto.common.TranslationsTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryTO implements AbstractTO {
    private long id;
    private TranslationsTO name;
    private List<ProductTypeTO> types;
    private int sortingOrder;
}
