package be.spotsupply.e2e.application.proxy.rules;

import be.spotsupply.e2e.application.proxy.rules.common.TomcatProxyRule;
import io.netty.handler.codec.http.DefaultHttpRequest;

public class DefaultProxyRule extends TomcatProxyRule {

    @Override
    public boolean canProxy(DefaultHttpRequest httpRequest) {
        return true;
    }
}
