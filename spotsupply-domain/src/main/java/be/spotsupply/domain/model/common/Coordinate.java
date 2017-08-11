package be.spotsupply.domain.model.common;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Coordinate {
    private double longitude;
    private double latitude;
}
