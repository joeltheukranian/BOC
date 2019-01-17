package com.boc.controller;

import com.boc.client.model.WeatherEntry;
import com.boc.services.WeatherDataService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    	List<WeatherEntry> weather = weatherDataService.getWeather(null, null);
    	
    	logger.info("returned " + weather.size() + " rows of data");
    	if(weather.isEmpty())
    		return ResponseEntity.badRequest().body("No Data");
    	else 
    		return ResponseEntity.ok(weather);
    }

    //GET Handler for /weatherData/MMddYYYY/MMddYYYY (from, then to)
    @GetMapping("/weatherData/{fromDate}/{toDate}")
    public ResponseEntity<?> getWeatherDataFiltered(@PathVariable String fromDate, @PathVariable String toDate) {
    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMDD");
    	Date from = null;
    	Date to = null;
    	try {
			from = dateFormat.parse(fromDate);
	    	to =  dateFormat.parse(toDate);
		} catch (ParseException e) {
			return ResponseEntity.badRequest().body("Bad date format");
		}
    	
    	List<WeatherEntry> weather = weatherDataService.getWeather(from, to);
    	
    	logger.info("returned " + weather.size() + " rows of data");
    	if(weather.isEmpty())
    		return ResponseEntity.badRequest().body("No Data");
    	else 
    		return ResponseEntity.ok(weather);
    }


}
