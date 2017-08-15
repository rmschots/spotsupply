package be.spotsupply.e2e.tests.util;

public class Geolocation {


    public static final String GEOLOCATION_OVERRIDE = "window.navigator.geolocation.getCurrentPosition = function (success) {\n" +
        "  var position = {\"coords\": {\"latitude\": \"%1$f\", \"longitude\": \"%2$f\"}};\n" +
        "  success(position);\n" +
        "};\n" +
        "window.navigator.geolocation.watchPosition = function (success) {\n" +
        "  var position = {\"coords\": {\"latitude\": \"%1$f\", \"longitude\": \"%2$f\"}};\n" +
        "  success(position);\n" +
        "}";
}
