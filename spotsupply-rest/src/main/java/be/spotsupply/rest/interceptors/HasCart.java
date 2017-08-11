package be.spotsupply.rest.interceptors;

import be.spotsupply.domain.model.order.CartStatus;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static be.spotsupply.domain.model.order.CartStatus.ANY;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface HasCart {
    CartStatus status() default ANY;
}
