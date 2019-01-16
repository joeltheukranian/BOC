var weatherData = null;

$(document).ready(function () {
	
	load_weather_data();

    $("#filter-form").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        filter();

    });

});

function populateWeatherTable(weatherDataFromServer) {
	var weatherTable = document.getElementById("weatherTable");
	var currentIndex = 1;
	var indexInData = 1;
	
	weatherDataFromServer.forEach(function(eachWeatherEntry) {
		var row = weatherTable.insertRow(currentIndex);
		currentIndex = currentIndex + 1;
	
		// Insert 
		var cell1 = row.insertCell(0); // Station
		var cell2 = row.insertCell(1); // Province
		var cell3 = row.insertCell(2); // Date
		var cell4 = row.insertCell(3); // Mean_Temp
		var cell5 = row.insertCell(3); // Highest_Monthly_Maxi_Temp
		var cell6 = row.insertCell(3); // Lowest_Monthly_Min_Temp
		
		// Add details text to the new cells
		cell1.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.station_name + "</label>";
		cell2.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.date + "</label>";
		cell3.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.province + "</label>";
		cell4.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.meanTemp + "</label>";
		cell5.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.highest_Monthly_Max_Temp + "</label>";
		cell6.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.lowestMonthly_Min_Temp + "</label>";
		
		indexInData += 1;
	})
	
}


function load_weather_data() {

   $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/weatherData",
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

            console.log("SUCCESS : ", data);
            populateWeatherTable(data);

            weatherData = data;
        },
        error: function (e) {


            console.log("ERROR : ", e);


        }
    });
}

function filter() {
//	var fromDate = convertToCurrentTimezone(new Date($("#from").val()));
//	var toDate = convertToCurrentTimezone(new Date($("#to").val()));
	var fromDate = new Date($("#from").val());
	var toDate = new Date($("#to").val());
	
	//clear existing rows
	var weatherTable = document.getElementById("weatherTable");
	
	var elmtTable = document.getElementById('weatherTable');
	var tableBody = elmtTable.getElementsByTagName('tbody')[0];
	var tableRows = tableBody.getElementsByTagName('tr');
	var rowCount = tableRows.length;

	for (var x=rowCount-1; x>0; x--) {
		tableBody.removeChild(tableRows[x]);
	}
	
	//populate with filtered rows
	var currentIndex = 1;
	var indexInData = 1;
	weatherData.forEach(function(eachWeatherEntry) {
		//parse Date from data. Convert DD/MM/YYYY => MM/DD/YYYY
		var currentDate = new Date(eachWeatherEntry.date.split("/")[1] + "/" + eachWeatherEntry.date.split("/")[0] + "/" + eachWeatherEntry.date.split("/")[2]);

		//********************************
		//convert to timezone (Starting to Think server side might be better here)
		
		//currentDate = convertToCurrentTimezone(currentDate);
//		var utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
//		var currentDateAdjusted = new Date(utc + (3600000*-4));
		
//		if((fromDate.getTime() <= currentDate.getTime()) && (toDate.getTime() >= currentDate.getTime())) {
		//********************************

		if(dates.inRange(currentDate, fromDate, toDate)) {
			var row = weatherTable.insertRow(currentIndex);
			currentIndex = currentIndex + 1;
		
			// Insert cells
			var cell1 = row.insertCell(0); // Station
			var cell2 = row.insertCell(1); // Province
			var cell3 = row.insertCell(2); // Date
			var cell4 = row.insertCell(3); // Mean_Temp
			var cell5 = row.insertCell(3); // Highest_Monthly_Maxi_Temp
			var cell6 = row.insertCell(3); // Lowest_Monthly_Min_Temp
			
			// Add details text to the new cells
			cell1.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.station_name + "</label>";
			cell2.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.province + "</label>";
			cell3.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.date + "</label>";
			//when click on cell, pass the index
			cell4.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.meanTemp + "</label>";
			//cell4.onclick = clickCell() 
			cell5.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.highest_Monthly_Max_Temp + "</label>";
			cell6.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.lowestMonthly_Min_Temp + "</label>";
		}
		++indexInData;
	})

}

function clickrow(index){
	//alert("Row index is: " + index);
	localStorage.setItem("station", weatherData[index].station_name);
	localStorage.setItem("province", weatherData[index].province);
	localStorage.setItem("date", weatherData[index].date);
	localStorage.setItem("meanTemp", weatherData[index].meanTemp);
	localStorage.setItem("lowestMonthly_Min_Temp", weatherData[index].lowestMonthly_Min_Temp);
	localStorage.setItem("highest_Monthly_Max_Temp", weatherData[index].highest_Monthly_Max_Temp);
	
	
	location.href="/details"
}

//This is an issue. I think Maybe doing this in Java on the server might be better
function convertToCurrentTimezone(currentDate) {
	var utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
	return new Date(utc + (3600000*-4));
}


//Found on stackoverflow
var dates = {
	    convert:function(d) {
	        // Converts the date in d to a date-object. The input can be:
	        //   a date object: returned without modification
	        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
	        //   a number     : Interpreted as number of milliseconds
	        //                  since 1 Jan 1970 (a timestamp) 
	        //   a string     : Any format supported by the javascript engine, like
	        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
	        //  an object     : Interpreted as an object with year, month and date
	        //                  attributes.  **NOTE** month is 0-11.
	        return (
	            d.constructor === Date ? d :
	            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
	            d.constructor === Number ? new Date(d) :
	            d.constructor === String ? new Date(d) :
	            typeof d === "object" ? new Date(d.year,d.month,d.date) :
	            NaN
	        );
	    },
	    compare:function(a,b) {
	        // Compare two dates (could be of any type supported by the convert
	        // function above) and returns:
	        //  -1 : if a < b
	        //   0 : if a = b
	        //   1 : if a > b
	        // NaN : if a or b is an illegal date
	        // NOTE: The code inside isFinite does an assignment (=).
	        return (
	            isFinite(a=this.convert(a).valueOf()) &&
	            isFinite(b=this.convert(b).valueOf()) ?
	            (a>b)-(a<b) :
	            NaN
	        );
	    },
	    inRange:function(d,start,end) {
	        // Checks if date in d is between dates in start and end.
	        // Returns a boolean or NaN:
	        //    true  : if d is between start and end (inclusive)
	        //    false : if d is before start or after end
	        //    NaN   : if one or more of the dates is illegal.
	        // NOTE: The code inside isFinite does an assignment (=).
	       return (
	            isFinite(d=this.convert(d).valueOf()) &&
	            isFinite(start=this.convert(start).valueOf()) &&
	            isFinite(end=this.convert(end).valueOf()) ?
	            start <= d && d <= end :
	            NaN
	        );
	    }
	}