package com.connor.potionshop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS to all endpoints
            .allowedOrigins("*") // Allow all origins (can be specific urls instead)
            .allowedMethods("*") // Allow all methods (can be replaced with "GET", "PUT", etc.)
            .allowedHeaders("*") // Allow all headers (needed for things like JSON requests, custom metadata, etc.)
            .maxAge(3600); // Cache preflight response for 1 hour
    }
}

/*
    Development note: this is required and I figured this out because when trying to do an http request from my frontend,
    I got a 403: Forbidden error like this: "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the
    remote resource at http://localhost:8080/potions. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
    Status code: 403."

    Because this api will never be live and only used for demos on people's local machines, it's okay to allow all origins
    via the wildcard '*'. However, in a live production that's a horrible idea due to security concerns.
 */
