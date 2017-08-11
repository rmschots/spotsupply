package be.spotsupply.rest.util;

import be.spotsupply.rest.dto.common.CoordinateTO;
import math.geom2d.Point2D;
import org.osgeo.proj4j.*;

public class CoordinateTransformer {

    private static CoordinateTransform transformer;

    private CoordinateTransformer() {
    }

    static {
        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
        CRSFactory csFactory = new CRSFactory();
        CoordinateReferenceSystem crs1 = csFactory.createFromName("EPSG:4326");
        CoordinateReferenceSystem crs2 = csFactory.createFromName("EPSG:3812");
        transformer = ctFactory.createTransform(crs1, crs2);
    }

    public static Point2D toPoint2D(CoordinateTO coordinateTO) {

        ProjCoordinate p1 = new ProjCoordinate(coordinateTO.getLng(), coordinateTO.getLat());
        ProjCoordinate p2 = new ProjCoordinate();
        transformer.transform(p1, p2);

        return new Point2D(p2.x, p2.y);
    }
}
