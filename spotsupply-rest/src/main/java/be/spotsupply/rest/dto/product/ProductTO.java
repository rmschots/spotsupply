package be.spotsupply.rest.dto.product;

import be.spotsupply.rest.AbstractTO;
import be.spotsupply.rest.dto.common.TranslationsTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductTO implements AbstractTO {
    private Long id;
    private TranslationsTO name;
    private TranslationsTO extraInfo;
    private Double price;
    private boolean active;
}
