package be.spotsupply.rest.endpoints.beach;

import be.spotsupply.rest.dto.common.CoordinateTO;
import be.spotsupply.rest.mapper.impl.BeachMapper;
import be.spotsupply.service.BeachService;
import be.spotsupply.rest.util.CoordinateTransformer;
import math.geom2d.Point2D;
import math.geom2d.polygon.Polygon2D;
import math.geom2d.polygon.SimplePolygon2D;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static be.spotsupply.rest.util.CoordinateTransformer.toPoint2D;

@RestController
@RequestMapping("geo")
public class GeoEndpoint {

    @Autowired
    private BeachService beachService;
    @Autowired
    private BeachMapper beachMapper;

    @PostMapping("distances")
    public Map<Long, Double> getDistanceToBeach(@RequestBody CoordinateTO coordinate) {
        Map<Long, Double> distanceMap = new HashMap<>();
        Point2D point = toPoint2D(coordinate);
        beachMapper.mapToTOs(beachService.getAllBeaches()).forEach(beach -> {
            List<Point2D> points = beach.getCoordinates().stream()
                    .map(CoordinateTransformer::toPoint2D)
                    .collect(Collectors.toList());
            Polygon2D polygon = new SimplePolygon2D(points);
            double distance = polygon.distance(point);
            distanceMap.put(beach.getId(), distance);
        });
        return distanceMap;
    }
}
