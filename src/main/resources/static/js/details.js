var weatherData = null;

$(document).ready(function () {
	
	$("#station").val(localStorage.getItem("station"));
	$("#province").val(localStorage.getItem("province"));
	$("#date").val(localStorage.getItem("date"));
	$("#meanTemp").val(localStorage.getItem("meanTemp"));
	$("#lowestMonthly_Min_Temp").val(localStorage.getItem("lowestMonthly_Min_Temp"));
	$("#highest_Monthly_Max_Temp").val(localStorage.getItem("highest_Monthly_Max_Temp"));

});

