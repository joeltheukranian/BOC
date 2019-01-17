package com.boc.services;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.boc.client.model.WeatherEntry;
import javax.annotation.PostConstruct;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//WeatherDataService: Helper service to read CSV climate data
@Service
public class WeatherDataService {
    private final Logger logger = LoggerFactory.getLogger(WeatherDataService.class);

    private List<WeatherEntry> weather;

	public List<WeatherEntry> getWeather(Date from, Date to) {
		if(from == null) {
			logger.info("from is null");
			return weather;
		}
		
		logger.info("from: " + from + " to: " + to);
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		List<WeatherEntry> newWeather = new ArrayList<WeatherEntry>();
		weather.forEach(weatherEntry -> {
			Date entryDate;
			try {
				entryDate = dateFormat.parse(weatherEntry.getDate());
				if ((from.before(entryDate) || from.equals(entryDate)) && (to.after(entryDate) || to.equals(entryDate))) {
					logger.info("matched: " + weatherEntry.getDate());
					newWeather.add(weatherEntry);
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
		return newWeather;
	}
    
    // Read CSV data
    @PostConstruct
    private void readCSV() {
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
