package com.thecodereveal.shopease.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JWTTokenHelper jwtTokenHelper;

    public JWTAuthenticationFilter(JWTTokenHelper jwtTokenHelper,UserDetailsService userDetailsService) {
        this.jwtTokenHelper = jwtTokenHelper;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            String authHeader = request.getHeader("Authorization");

            if(null == authHeader || !authHeader.startsWith("Bearer")){
                filterChain.doFilter(request,response);
                return;
            }

            try{
                String authToken = jwtTokenHelper.getToken(request);
                if(null != authToken){
                    String userName = jwtTokenHelper.getUserNameFromToken(authToken);
                    if(null != userName){
                        UserDetails userDetails= userDetailsService.loadUserByUsername(userName);

                        if(jwtTokenHelper.validateToken(authToken,userDetails)) {
                            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            authenticationToken.setDetails(new WebAuthenticationDetails(request));

                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        }
                    }

                }
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
    }
}
