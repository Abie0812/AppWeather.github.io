$(document).ready(function() {
	$('.short').hide();
	if(navigator.geolocation) {
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position) {
			currentPosition = position;

			/** Set latitude and longitude */
			var latitude = currentPosition.coords.latitude;
			var longitude = currentPosition.coords.longitude;

			// console.log(latitude, longitude);

			var url = 'http://api.apixu.com/v1/current.json?key=4b5b5aa47342444783805918180102&q=';
			$.getJSON(url + latitude + ',' + longitude, function(data) {
				/** JSON.stringify() is used to convert a Javascript object to a string */
				/** JSON.parse() is used to parse data to a Javascript objects */
				
				/** JSON.stringfy turns a javascript into 
					JSON text and stores that JSON text in a string. */
				var data = JSON.stringify(data);
				
				/** JSON.parse turns a string of JSON text into a Javascript object. */
				var json = JSON.parse(data);
				
				var country = json.location.country;
				var city = json.location.name;
				var state = json.location.region;

				var temp = json.current.temp_c;
				var temp_f = json.current.temp_f;
				var last_updated = json.current.last_updated.replace('-', ' ');

				var wind = json.current.wind_kph;
				var humidity = json.current.humidity;
				var time = json.location.localtime.split(' ')[1];
				var cloud = json.current.cloud;
				// console.log(data);

				$('#weather').html(city + ', ' + state + ', ' + country);

				if(temp < 18) {
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/08/01/02/03/trees-2562807_960_720.jpg)'
					});
					$('#status').html("<h1>Udara yang menyejukkan . . . .<hr></h1>");
				} else if(temp > 10 && temp < 28) {
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/22/17/40/hill-2165759_960_720.jpg)'
					});
					$('#status').html("<h1>Cerah untuk bermain . . . .<hr></h1>");
				} else {
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/03/26/10/29/sand-dunes-691431_960_720.jpg)'
					});
					$('#status').html("<h1>Panas untuk berjemur . . . .<hr></h1>");
				}


				$('#info1').html(time);
				$('#info2').html('Angin ' + wind + ' kph');
				$('#info3').html(temp + '&#8451');

				$('.short').show();

				/** Toggle */
				var yes = true;	
				$('#switch').on('click', function() {
					if (yes) {
						$('#info3').html(temp_f + '&#8457');
						$('#switch').html('Tampilkan Celcius');
						yes = false;
					} else {
						$('#info3').html(temp + '&#8451');
						$('#switch').html('Tampilkan Fahreinheit');
						yes = true;
					}
				});

				/** Showing Sky Status */
				if(cloud <= 30) {
					$('#info5').html('Cerah');
				} else {
					$('#info5').html('Berawan');
				}
				$('#info6').html('Kelembaban ' + humidity + '%');


			});			
		});	
	}
});

