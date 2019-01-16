package com.boc.services;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import com.boc.client.WeatherEntry;
import com.boc.model.User;

import javax.annotation.PostConstruct;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeatherDataService {

    private List<WeatherEntry> weather;

    // Love Java 8
//    public List<User> findByUserNameOrEmail(String username) {
//
//        List<User> result = users.stream().filter(x -> x.getUsername().equalsIgnoreCase(username)).collect(Collectors.toList());
//
//        return result;
//
//    }

    public List<WeatherEntry> getWeather() {

        return weather;

    }
    
    // Init some users for testing
    @PostConstruct
    private void iniDataForTesting() {
    	weather = new ArrayList<WeatherEntry>();
    	//read CSV
    	Reader reader;
		try {
			reader = Files.newBufferedReader(Paths.get("eng-climate-summary.csv"));
	    	CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader());
			for (CSVRecord csvRecord : csvParser) {
				WeatherEntry weatherEntry = new WeatherEntry(
					csvRecord.get("Station_Name"),
					csvRecord.get("Province"),
					csvRecord.get("Date"),
					csvRecord.get("Mean_Temp"),
					csvRecord.get("Highest_Monthly_Maxi_Temp"),
					csvRecord.get("Lowest_Monthly_Min_Temp"));
				weather.add(weatherEntry);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

    }

}
