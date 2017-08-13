package be.spotsupply.e2e.application.proxy;

import be.spotsupply.e2e.application.proxy.rules.*;
import be.spotsupply.e2e.application.proxy.rules.common.SpotsupplyProxyRule;
import io.netty.handler.codec.http.DefaultHttpRequest;
import io.netty.handler.codec.http.HttpResponse;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class SpotsupplyProxyChain {

    private static final HttpResponse CONTINUE = null;
    private final List<SpotsupplyProxyRule> proxyRules;

    public SpotsupplyProxyChain() {
        this.proxyRules = newArrayList(
                new SpotsupplyUiIndexProxyRule(),
                new SpotsupplyUiAppJsProxyRule(),
                new SpotsupplyUiAssetsProxyRule(),
                new DefaultProxyRule()
        );
    }

    public HttpResponse proxy(DefaultHttpRequest httpRequest) {
        for (SpotsupplyProxyRule proxyRule : proxyRules) {
            if (proxyRule.canProxy(httpRequest)) {
                return proxyRule.proxy(httpRequest);
            }
        }
        return CONTINUE;
    }
}
