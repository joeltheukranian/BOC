package com.boc.controller;

import com.boc.services.WeatherDataService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    private final Logger logger = LoggerFactory.getLogger(WeatherController.class);

    //WeatherDataService: to get weather data to send to the client
    WeatherDataService weatherDataService;

    @Autowired
    public void setWeatherDataService(WeatherDataService userService) {
        this.weatherDataService = userService;
    }

    //GET Handler for /weatherData
    @GetMapping("/weatherData")
    public ResponseEntity<?> getWeatherData() {
    	logger.info("returned " + weatherDataService.getWeather().size() + " rows of data");
    	return ResponseEntity.ok(weatherDataService.getWeather());
    }


}
