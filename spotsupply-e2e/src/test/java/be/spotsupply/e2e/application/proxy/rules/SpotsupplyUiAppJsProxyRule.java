package be.spotsupply.e2e.application.proxy.rules;

import be.spotsupply.e2e.application.proxy.rules.common.SpotsupplyUiFileSystemProxyRule;
import io.netty.handler.codec.http.DefaultHttpRequest;

import java.util.Set;

import static com.google.common.collect.Sets.newHashSet;

public class SpotsupplyUiAppJsProxyRule extends SpotsupplyUiFileSystemProxyRule {

    private static final Set<String> APP_JS_PATH = newHashSet(
            "/inline.bundle.js", "/main.bundle.js", "/polyfills.bundle.js", "/styles.bundle.js", "/vendor.bundle.js");

    @Override
    public boolean canProxy(DefaultHttpRequest httpRequest) {
        return APP_JS_PATH.contains(httpRequest.uri());
    }

    @Override
    protected String fileName(String uri) {
        return uri.replaceFirst("/", "");
    }
}
