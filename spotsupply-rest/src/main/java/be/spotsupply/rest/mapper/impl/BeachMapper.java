package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.beach.Beach;
import be.spotsupply.rest.dto.beach.BeachTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BeachMapper implements DomainToTOMapper<Beach, BeachTO> {

    @Autowired
    private CoordinateMapper coordinateMapper;

    public BeachTO mapToTO(Beach beach) {
        if (beach == null) {
            return null;
        }
        return BeachTO.builder()
                .id(beach.getId())
                .name(beach.getName())
                .coordinates(coordinateMapper.mapToTOs(beach.getCoordinates()))
                .build();
    }
}
