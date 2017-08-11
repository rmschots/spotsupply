package be.spotsupply.security;

import be.spotsupply.domain.model.user.User;
import be.spotsupply.rest.dto.order.ShoppingCartTO;
import be.spotsupply.rest.dto.user.UserCartTO;
import be.spotsupply.rest.mapper.impl.ShoppingCartMapper;
import be.spotsupply.rest.mapper.impl.UserMapper;
import be.spotsupply.service.ShoppingCartService;
import be.spotsupply.service.exceptions.UnauthorizedEception;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private ShoppingCartService shoppingCartService;
    @Autowired
    private ShoppingCartMapper shoppingCartMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider
                = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().permitAll();
        http.httpBasic().disable();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
        http.formLogin()
                .loginPage("/account/login")
                .successHandler((request, response, authentication) -> {
                    ShoppingCartTO cartTO = shoppingCartMapper.mapToTO(
                            shoppingCartService.migrateShoppingCartOfSessionToUser(((WebAuthenticationDetails) authentication.getDetails()).getSessionId(), (User) authentication.getPrincipal())
                    );
                    addCORSHeaders(request, response);
                    writeResponse(response, UserCartTO.builder().cart(cartTO).user(userMapper.mapToTO((User) authentication.getPrincipal())).build());
                })
                .failureHandler((request, response, exception) -> {
                    addCORSHeaders(request, response);
                    writeResponse(response, new BadCredentialsException("bad credentials"), HttpStatus.FORBIDDEN);
                });
        http.logout()
                .logoutUrl("/account/logout")
                .deleteCookies("spotsupply_session_id")
                .invalidateHttpSession(true)
                .logoutSuccessHandler((request, response, authentication) -> addCORSHeaders(request, response));
        http.exceptionHandling()
                .authenticationEntryPoint((request, response, e) -> {
                    addCORSHeaders(request, response);
                    writeResponse(response, new UnauthorizedEception(), HttpStatus.UNAUTHORIZED);
                });
    }

    private void addCORSHeaders(HttpServletRequest request, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    private void writeResponse(HttpServletResponse response, Object object, HttpStatus httpStatus) throws IOException {
        writeResponse(response, object);
        response.setStatus(httpStatus.value());
    }

    private void writeResponse(HttpServletResponse response, Object object) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(object));
    }
}
