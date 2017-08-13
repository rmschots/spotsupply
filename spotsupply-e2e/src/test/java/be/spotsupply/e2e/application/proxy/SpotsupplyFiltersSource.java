package be.spotsupply.e2e.application.proxy;

import io.netty.handler.codec.http.HttpRequest;
import org.littleshoot.proxy.HttpFilters;
import org.littleshoot.proxy.HttpFiltersSourceAdapter;

public class SpotsupplyFiltersSource extends HttpFiltersSourceAdapter {

    @Override
    public HttpFilters filterRequest(HttpRequest originalRequest) {
        return new SpotsupplyHttpFilters(originalRequest);
    }
}
