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
		cell1.innerHTML = eachWeatherEntry.station_name;
		cell2.innerHTML = eachWeatherEntry.date;
		cell3.innerHTML = eachWeatherEntry.province;
		cell4.innerHTML = eachWeatherEntry.meanTemp;
		cell5.innerHTML = eachWeatherEntry.highest_Monthly_Max_Temp;
		cell6.innerHTML = eachWeatherEntry.lowestMonthly_Min_Temp;
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

            //var json = "<h4>Ajax Response</h4><pre>"
            //    + JSON.stringify(data, null, 4) + "</pre>";
            //$('#feedback').html(json);

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
		if(fromDate.getTime() <= currentDate.getTime() && toDate.getTime() >= currentDate.getTime()) {
			var row = weatherTable.insertRow(currentIndex);
			currentIndex = currentIndex + 1;
		
			//row.onclick = clickrow;
			
			// Insert 
			var cell1 = row.insertCell(0); // Station
			var cell2 = row.insertCell(1); // Province
			var cell3 = row.insertCell(2); // Date
			var cell4 = row.insertCell(3); // Mean_Temp
			var cell5 = row.insertCell(3); // Highest_Monthly_Maxi_Temp
			var cell6 = row.insertCell(3); // Lowest_Monthly_Min_Temp
			
			// Add details text to the new cells
			cell1.innerHTML = eachWeatherEntry.station_name;
			cell2.innerHTML = eachWeatherEntry.province;
			cell3.innerHTML = eachWeatherEntry.date;
			//when click on cell, pass the index
			cell4.innerHTML = "<label onclick='clickrow(" + (indexInData - 1) +  ")'>" + eachWeatherEntry.meanTemp + "</label>";
			//cell4.onclick = clickCell() 
			cell5.innerHTML = eachWeatherEntry.highest_Monthly_Max_Temp;
			cell6.innerHTML = eachWeatherEntry.lowestMonthly_Min_Temp;
		}
		++indexInData;
	})

}

function clickrow(index){
	alert("Row index is: " + index);
	localStorage.setItem("station", weatherData[index].station_name);
	localStorage.setItem("province", weatherData[index].province);
	localStorage.setItem("date", weatherData[index].date);
	localStorage.setItem("meanTemp", weatherData[index].meanTemp);
	localStorage.setItem("lowestMonthly_Min_Temp", weatherData[index].lowestMonthly_Min_Temp);
	localStorage.setItem("highest_Monthly_Max_Temp", weatherData[index].highest_Monthly_Max_Temp);
	
	
	location.href="/details"
}

function fire_ajax_submit() {

    var search = {}
    search["username"] = $("#username").val();
    //search["email"] = $("#email").val();

    $("#btn-search").prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/search",
        data: JSON.stringify(search),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

            var json = "<h4>Ajax Response</h4><pre>"
                + JSON.stringify(data, null, 4) + "</pre>";
            $('#feedback').html(json);

            console.log("SUCCESS : ", data);
            $("#btn-search").prop("disabled", false);

        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4><pre>"
                + e.responseText + "</pre>";
            $('#feedback').html(json);

            console.log("ERROR : ", e);
            $("#btn-search").prop("disabled", false);

        }
    });

}