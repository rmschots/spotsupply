package be.spotsupply.e2e.application.proxy.rules;

import be.spotsupply.e2e.application.proxy.rules.common.SpotsupplyUiFileSystemProxyRule;
import io.netty.handler.codec.http.DefaultHttpRequest;
import io.netty.handler.codec.http.HttpResponse;

import java.util.Set;

import static com.google.common.collect.Sets.newHashSet;

public class SpotsupplyUiAssetsProxyRule extends SpotsupplyUiFileSystemProxyRule {

    @Override
    public boolean canProxy(DefaultHttpRequest httpRequest) {
        return httpRequest.uri().startsWith("/assets");
    }

    @Override
    protected String fileName(String uri) {
        return uri.replaceFirst("/", "");
    }

    @Override
    public HttpResponse proxy(DefaultHttpRequest httpRequest) {
        HttpResponse httpResponse = super.proxy(httpRequest);
        if(httpRequest.uri().endsWith(".css")){
            httpResponse.headers().add("Content-Type","text/css");
        }
        return httpResponse;
    }
}
