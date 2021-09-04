package com.travel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class TravelSuppliesInPocketsV3Application {

	public static void main(String[] args) {
		SpringApplication.run(TravelSuppliesInPocketsV3Application.class, args);
	}

}
