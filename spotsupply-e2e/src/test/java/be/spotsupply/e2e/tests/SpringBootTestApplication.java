package be.spotsupply.e2e.tests;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@ComponentScan(basePackages = { "be.spotsupply" },
        excludeFilters = @ComponentScan.Filter(type = FilterType.ASPECTJ, pattern = "be.spotsupply.rest.endpoints.*"))
@EnableAsync
public class SpringBootTestApplication {

}
