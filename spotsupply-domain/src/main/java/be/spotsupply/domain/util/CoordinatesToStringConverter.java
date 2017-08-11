package be.spotsupply.domain.util;

import be.spotsupply.domain.model.common.Coordinate;

import javax.persistence.AttributeConverter;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class CoordinatesToStringConverter implements AttributeConverter<List<Coordinate>, String> {

    @Override
    public String convertToDatabaseColumn(List<Coordinate> coordinates) {
        return coordinates.stream()
                .map(coordinate -> coordinate.getLongitude() + "," + coordinate.getLatitude())
                .collect(Collectors.joining(";"));
    }

    @Override
    public List<Coordinate> convertToEntityAttribute(String coordinatesString) {
        return Pattern.compile(";")
                .splitAsStream(coordinatesString)
                .map(s -> {
                    String[] cString = s.split(",");
                    return Coordinate.builder()
                            .longitude(Double.parseDouble(cString[0]))
                            .latitude(Double.parseDouble(cString[1]))
                            .build();
                })
                .collect(Collectors.toList());
    }
}
