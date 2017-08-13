package be.spotsupply;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@PropertySource({"classpath:application-${envTarget:dev}.properties"})
@ComponentScan({"be.spotsupply"})
@EnableAsync
@EnableScheduling
public class SpotSupplyApplication {
    protected SpotSupplyApplication() {
    }

    public static void main(String[] args) {
        SpringApplication.run(SpotSupplyApplication.class, args);
    }
}
