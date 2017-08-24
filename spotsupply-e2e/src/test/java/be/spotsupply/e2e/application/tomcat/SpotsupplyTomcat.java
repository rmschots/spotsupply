package be.spotsupply.e2e.application.tomcat;

import be.spotsupply.SpotSupplyApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

public class SpotsupplyTomcat {

    private static SpotsupplyTomcat instance;

    private final int port = 8085;
    private final String contextPath = "";
    private boolean started = false;
    private ConfigurableApplicationContext applicationContext;

    private SpotsupplyTomcat() {
    }

    public String contextPath() {
        return contextPath;
    }

    public String baseUri() {
        return "http://localhost:" + port;
    }

    public void start() {
        if (!started) {
            startTomcat();
            started = true;
        }
    }

    private void startTomcat() {
        this.applicationContext = new SpringApplicationBuilder()
            .sources(SpotSupplyApplication.class)
            // Configuration on standalone tomcat is a little different, see https://tomcat.apache.org/tomcat-8.0-doc/config/http.html
            // compression, compressionMinSize, compressableMimeType
            .properties("server.compression.enabled=true")
            .properties("server.compression.mime-types=application/json")
            // server.port is niet nodig, want staat in de application-local.yml
            .properties("server.contextPath:" + contextPath)
            .run();
    }

    public ConfigurableApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static SpotsupplyTomcat getInstance() {
        if (instance == null)
            instance = new SpotsupplyTomcat();
        return instance;
    }

    public int getPort() {
        return port;
    }
}
