package be.spotsupply.rest.config;

import be.spotsupply.service.util.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class WebRequestInterceptor extends HandlerInterceptorAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebRequestInterceptor.class);

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        if (!"OPTIONS".equals(request.getMethod())) {
            LOGGER.info(request.getMethod()
                    + ": " + request.getRequestURL()
                    + " session:" + request.getSession().getId()
                    + " user: " + (authenticationService.isAnonymous() ? "null" : authenticationService.getUser().getEmail()));
        }
        return super.preHandle(request, response, handler);
    }
}