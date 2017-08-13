package be.spotsupply.e2e.application.proxy.rules.common;

import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.DefaultHttpRequest;
import io.netty.handler.codec.http.HttpResponse;

import java.io.IOException;
import java.nio.file.Paths;

import static io.netty.buffer.Unpooled.copiedBuffer;
import static io.netty.handler.codec.http.HttpResponseStatus.OK;
import static io.netty.handler.codec.http.HttpVersion.HTTP_1_1;
import static java.nio.file.Files.readAllBytes;

public abstract class SpotsupplyUiFileSystemProxyRule implements SpotsupplyProxyRule {

    public static final String FILE_SYSTEM_ROOT = "../spotsupply-ui/dist-dev/";

    @Override
    public HttpResponse proxy(DefaultHttpRequest httpRequest) {
        byte[] fileByteArray = file(httpRequest.uri());
        DefaultFullHttpResponse httpResponse = new DefaultFullHttpResponse(HTTP_1_1, OK, copiedBuffer(fileByteArray), true);
        httpResponse.headers().add("Content-Length", fileByteArray.length);
        return httpResponse;
    }

    private byte[] file(String uri) {
        try {
            return readAllBytes(Paths.get(FILE_SYSTEM_ROOT + fileName(uri)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    protected abstract String fileName(String uri);
}
