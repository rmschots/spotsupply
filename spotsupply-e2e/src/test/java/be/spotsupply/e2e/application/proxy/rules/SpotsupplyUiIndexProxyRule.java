package be.spotsupply.e2e.application.proxy.rules;

import be.spotsupply.e2e.application.proxy.rules.common.SpotsupplyUiFileSystemProxyRule;
import io.netty.handler.codec.http.DefaultHttpRequest;

public class SpotsupplyUiIndexProxyRule extends SpotsupplyUiFileSystemProxyRule {

    private static final String INDEX = "index.html";
    private static final String INDEX_HTML_PATH = "/";

    @Override
    public boolean canProxy(DefaultHttpRequest httpRequest) {
        return INDEX_HTML_PATH.equals(httpRequest.uri());
    }

    @Override
    protected String fileName(String uri) {
        return INDEX;
    }
}
