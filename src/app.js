
var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Window({
	fullscreen: true,
});

var rect = new UI.Rect({
	position: new Vector2(0, 0),
	size: new Vector2(144, 168),
	backgroundColor: 'white',
});
main.add(rect);

// main time
var time = new UI.TimeText({
	position: new Vector2(0, 52),
	size: new Vector2(144, 30),
	font: 'bitham-42-medium-numbers',
	text: "%H:%M",
	color: 'black',
	textAlign: 'center'
});
main.add(time);

// day, date, month
var date = new UI.TimeText({
	position: new Vector2(0, 90),
	size: new Vector2(144, 30),
	font: 'gothic-24-bold',
	text: "%a, %d %b",
	color: 'black',
	textAlign: 'center'
});
main.add(date);

// overall PSI hourly reading
var overall = new UI.Text({
	position: new Vector2(3, 125),
	size: new Vector2(138, 30),
	font: 'gothic-18-bold',
	text: '',
	color: 'black',
	borderColor: 'black',
	textAlign: 'center'
});
main.add(overall);

var place = new UI.Text({
	position: new Vector2(3, 10),
	size: new Vector2(138, 24),
	font: 'gothic-18-bold',
	text: '',
	color: 'black',
	textAlign: 'center'
});
main.add(place);

var updated = new UI.Text({
	position: new Vector2(3, 30),
	size: new Vector2(138, 24),
	font: 'gothic-14-bold',
	text: '',
	color: 'black',
	textAlign: 'center'
});
main.add(updated);

var action = function(location) {
  var u = 'http://myhazeserv.herokuapp.com/reading?lat=' + location.coords.latitude + '&long=' + location.coords.longitude; 
	ajax({
		url: u,
		type: 'json'
	},
	function(data) {   
    updated.text(data.latest.time);
    place.text(data.location.area);
    overall.text(data.latest.index + ' ' + data.latest.description);  
	});
};

var update = function() {
  navigator.geolocation.getCurrentPosition( 
    action,
    function(err) { overall.text("Cannot get data"); }, 
    { timeout: 15000, maximumAge: 10000 }
  ); 
};

//update on startup
update();
main.show();

// update again on accelerator tapping
main.on('accelTap', function(e) {
	update();
});

