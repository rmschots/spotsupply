package be.spotsupply.rest.interceptors;

import be.spotsupply.domain.model.order.CartStatus;
import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.service.exceptions.CartCannotBeChangedException;
import be.spotsupply.service.exceptions.CartDoesNotExistException;
import be.spotsupply.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

import static be.spotsupply.domain.model.order.CartStatus.ANY;

public class HasCartInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod hm = (HandlerMethod) handler;
            Method method = hm.getMethod();
            if (method.isAnnotationPresent(HasCart.class)) {
                ShoppingCart cart = shoppingCartService.fetchCartWithLock();
                checkIfCartNotNull(cart);
                CartStatus requiredStatus = method.getAnnotation(HasCart.class).status();
                if (!ANY.equals(requiredStatus)) {
                    checkIfCartHasStatus(cart, requiredStatus);
                }
            }
        }
        return true;
    }

    private void checkIfCartNotNull(ShoppingCart cart) {
        if (cart == null) {
            throw new CartDoesNotExistException();
        }
    }

    private void checkIfCartHasStatus(ShoppingCart cart, CartStatus requiredStatus) {
        if (!requiredStatus.equals(cart.getStatus())) {
            throw new CartCannotBeChangedException();
        }
    }
}
