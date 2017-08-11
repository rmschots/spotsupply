package be.spotsupply.rest.dto.order;

import be.spotsupply.rest.AbstractTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateCartTO implements AbstractTO {
    private Long beachId;
}
