package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.common.Coordinate;
import be.spotsupply.rest.dto.common.CoordinateTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import org.springframework.stereotype.Component;

@Component
public class CoordinateMapper implements DomainToTOMapper<Coordinate, CoordinateTO> {

    public CoordinateTO mapToTO(Coordinate coordinate) {
        if (coordinate == null) {
            return null;
        }
        return CoordinateTO.builder()
                .lng(coordinate.getLongitude())
                .lat(coordinate.getLatitude())
                .build();
    }
}
