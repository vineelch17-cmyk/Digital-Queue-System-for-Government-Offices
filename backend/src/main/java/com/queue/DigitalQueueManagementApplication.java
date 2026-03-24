package com.queue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DigitalQueueManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(DigitalQueueManagementApplication.class, args);
    }
}
