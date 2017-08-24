package be.spotsupply.e2e.application.proxy;

import org.littleshoot.proxy.impl.DefaultHttpProxyServer;

import java.net.InetSocketAddress;

public class SpotsupplyProxy {

    private static SpotsupplyProxy instance = null;

    private int port = 4200;
    private boolean started = false;

    private SpotsupplyProxy() {
    }

    public int port() {
        return port;
    }

    public void start() {
        if (!started) {
            startProxy();
            started = true;
        }
    }

    private void startProxy() {
        DefaultHttpProxyServer.bootstrap()
            .withAllowLocalOnly(true)
            .withAddress(InetSocketAddress.createUnresolved("localhost", port))
            .withPort(port)
            .withFiltersSource(new SpotsupplyFiltersSource())
            .start();
    }

    public static SpotsupplyProxy getInstance() {
        if (instance == null)
            instance = new SpotsupplyProxy();
        return instance;
    }
}
