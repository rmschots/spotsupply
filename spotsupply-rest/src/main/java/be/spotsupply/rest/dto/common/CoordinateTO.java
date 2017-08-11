package be.spotsupply.rest.dto.common;

import be.spotsupply.rest.AbstractTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CoordinateTO implements AbstractTO {
    private double lng;
    public double lat;
}
