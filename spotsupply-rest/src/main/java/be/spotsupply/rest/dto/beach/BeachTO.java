package be.spotsupply.rest.dto.beach;

import be.spotsupply.rest.AbstractTO;
import be.spotsupply.rest.dto.common.CoordinateTO;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class BeachTO implements AbstractTO {
    private Long id;
    private String name;
    private List<CoordinateTO> coordinates;
}
