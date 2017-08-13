package be.spotsupply.e2e.application.proxy.rules.common;

import be.spotsupply.e2e.application.tomcat.SpotsupplyTomcat;
import io.netty.handler.codec.http.DefaultHttpRequest;
import io.netty.handler.codec.http.HttpResponse;

public abstract class TomcatProxyRule implements SpotsupplyProxyRule {

    public static final String TOMCAT_BASE_URL = SpotsupplyTomcat.getInstance().baseUri();

    @Override
    public HttpResponse proxy(DefaultHttpRequest httpRequest) {
        httpRequest.setUri(TOMCAT_BASE_URL + httpRequest.uri());
        return null;
    }
}
