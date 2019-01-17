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
	var fromDate = $("#from").val().replace(/-/g, "");
	var toDate = $("#to").val().replace(/-/g, "");
	
	//clear existing rows
	var weatherTable = document.getElementById("weatherTable");
	
	var elmtTable = document.getElementById('weatherTable');
	var tableBody = elmtTable.getElementsByTagName('tbody')[0];
	var tableRows = tableBody.getElementsByTagName('tr');
	var rowCount = tableRows.length;

	for (var x=rowCount-1; x>0; x--) {
		tableBody.removeChild(tableRows[x]);
	}
	
	//get filtered data
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/weatherData/" + fromDate + "/" + toDate,
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {

			console.log("SUCCESS : ", data);
			populateWeatherTable(data);

			weatherData = data;
		},
		error : function(e) {

			console.log("ERROR : ", e);
			alert(e.responseText)

		}
	});
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

