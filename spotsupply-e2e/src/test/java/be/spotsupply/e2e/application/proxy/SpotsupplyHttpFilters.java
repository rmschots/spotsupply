package be.spotsupply.e2e.application.proxy;

import io.netty.handler.codec.http.DefaultHttpRequest;
import io.netty.handler.codec.http.HttpObject;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.HttpResponse;
import org.littleshoot.proxy.HttpFiltersAdapter;

public class SpotsupplyHttpFilters extends HttpFiltersAdapter {

    private static final HttpResponse CONTINUE = null;
    private final SpotsupplyProxyChain chain;

    public SpotsupplyHttpFilters(HttpRequest originalRequest) {
        super(originalRequest);
        chain = new SpotsupplyProxyChain();
    }

    @Override
    public HttpResponse clientToProxyRequest(HttpObject httpObject) {
        if (httpObject instanceof DefaultHttpRequest) {
            return chain.proxy((DefaultHttpRequest) httpObject);
        }
        return CONTINUE;
    }
}
