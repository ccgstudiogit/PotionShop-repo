package com.connor.potionshop.exception;

import jakarta.persistence.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

// RestControllerAdvice is a global error-handler where any exception thrown in any controller can be caught here
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleNotFound(EntityNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
