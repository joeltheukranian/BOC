package com.boc.client;

import java.math.BigDecimal;

public class WeatherEntry {
	String station_name;
	String province;
	String date;
	String meanTemp;
	String highest_Monthly_Max_Temp;
	String lowestMonthly_Min_Temp;
	
	public WeatherEntry(String station_name, String province, String date, String meanTemp, String highest_Monthly_Max_Temp, String lowestMonthly_Min_Temp) {
		this.station_name = station_name;
		this.date = date;
		this.province = province;
		this.meanTemp = meanTemp;
		this.highest_Monthly_Max_Temp = highest_Monthly_Max_Temp;
		this.lowestMonthly_Min_Temp = lowestMonthly_Min_Temp;
	}
	
	public String getStation_name() {
		return station_name;
	}
	public void setStation_name(String station_name) {
		this.station_name = station_name;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getMeanTemp() {
		return meanTemp;
	}
	public void setMeanTemp(String meanTemp) {
		this.meanTemp = meanTemp;
	}
	public String getHighest_Monthly_Max_Temp() {
		return highest_Monthly_Max_Temp;
	}
	public void setHighest_Monthly_Max_Temp(String highest_Monthly_Max_Temp) {
		this.highest_Monthly_Max_Temp = highest_Monthly_Max_Temp;
	}
	public String getLowestMonthly_Min_Temp() {
		return lowestMonthly_Min_Temp;
	}
	public void setLowestMonthly_Min_Temp(String lowestMonthly_Min_Temp) {
		this.lowestMonthly_Min_Temp = lowestMonthly_Min_Temp;
	}
}
