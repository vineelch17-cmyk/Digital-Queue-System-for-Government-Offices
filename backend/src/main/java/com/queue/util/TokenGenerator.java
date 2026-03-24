package com.queue.util;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class TokenGenerator {

    public String generate(String officePrefix, int sequence) {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyy"));
        return officePrefix + "-" + date + "-" + String.format("%03d", sequence);
    }
}
