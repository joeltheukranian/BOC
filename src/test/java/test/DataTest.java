package test;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import com.boc.client.model.WeatherEntry;

import junit.framework.TestCase;

//DataTest: JUnit tests to verify CSV reads ok. Verify if a column is wrong it will fail (-ve test)
public class DataTest extends TestCase {
	
	public void testCSVFileIsReadable() {
		boolean failed = true;
		List <WeatherEntry> weather = new ArrayList<WeatherEntry>(); 
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
			failed = false;
		} catch (IOException e) {
			failed = true;
		}
		assertFalse("CSV did not load properly", failed);
	}
	
	//Because we renamed the Station_Name Column, this test will fail
	public void testCSVFileIsReadable_MUST_FAIL() {
		boolean failed = true;
		List <WeatherEntry> weather = new ArrayList<WeatherEntry>(); 
	   	//read CSV
    	Reader reader;
		try {
			reader = Files.newBufferedReader(Paths.get("eng-climate-summary_badStationName.csv"));
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
			failed = false;
		} catch (Exception e) {
			failed = true;
		}
		assertTrue("CSV did not load properly", failed);
	}	

}
