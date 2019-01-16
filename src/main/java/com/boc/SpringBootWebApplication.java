package com.boc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class SpringBootWebApplication {
	static Logger logger = LoggerFactory.getLogger(SpringBootWebApplication.class);

    public static void main(String[] args) throws Exception {
    	SpringApplication.run(SpringBootWebApplication.class, args);
    }

}