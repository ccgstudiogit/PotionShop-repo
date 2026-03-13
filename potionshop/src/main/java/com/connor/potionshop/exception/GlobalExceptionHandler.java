package com.connor.potionshop.exception;

import jakarta.persistence.*;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.*;
import org.springframework.http.converter.*;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;

// RestControllerAdvice is a global error-handler where any exception thrown in any controller can be caught here
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleNotFound(EntityNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            HttpMessageNotReadableException.class,
            HttpMessageConversionException.class
    })
    public ResponseEntity<?> handleInvalidJson(Exception e) {
        return new ResponseEntity<>("Invalid or malformed JSON", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolation(ConstraintViolationException e) {
        return new ResponseEntity<>("Entity validation failed. Are the variable names and types valid?", HttpStatus.BAD_REQUEST);
    }
}
