package be.spotsupply.e2e.application.proxy.rules.common;

import io.netty.handler.codec.http.DefaultHttpRequest;
import io.netty.handler.codec.http.HttpResponse;

public interface SpotsupplyProxyRule {

    boolean canProxy(DefaultHttpRequest httpRequest);

    HttpResponse proxy(DefaultHttpRequest httpRequest);
}
