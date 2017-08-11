package be.spotsupply.domain.commands.product;

import be.spotsupply.domain.model.common.Translation;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CreateProductCommand {
    private Translation name;
    private Translation extraInfo;
    private Double price;
    private boolean active;
    private List<Long> productTypes;
}
